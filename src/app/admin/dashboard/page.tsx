'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define the token key (must match)
const AUTH_TOKEN_KEY = "vendor_auth_token"; 

// Define a simple type for products for this dashboard
type PendingProduct = {
    id: number;
    name: string;
    category: string;
    isApproved: boolean;
    vendor: { shopName: string } | null;
    price: number;
    // ... other fields needed for display
};

export default function AdminDashboard() {
    const router = useRouter();
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [products, setProducts] = useState<PendingProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    // 1. Load Token on Mount
    useEffect(() => {
        const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
        if (storedToken) {
            setAuthToken(storedToken);
            // After setting token, fetch products
            fetchPendingProducts(storedToken); 
        } else {
            router.push('/vendors/login'); // Redirect to login if no token
        }
    }, [router]);

    // 2. Fetch Pending Products
    const fetchPendingProducts = async (token: string) => {
        setLoading(true);
        setError(null);
        
        // ⭐ We need a new backend route: /api/admin/products to list PENDING products.
        // For now, we will assume this route exists and is secured by Role.ADMIN
        try {
            const response = await fetch('/api/admin/products?status=pending', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errData = await response.json();
                // If 403, the token is valid but user is not ADMIN
                if (response.status === 403) {
                    throw new Error("Access Denied: Only Administrators can view this page.");
                }
                throw new Error(errData.error || 'Failed to fetch pending products.');
            }

            const data: PendingProduct[] = await response.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 3. Handle Approval/Rejection
    const handleApproval = async (productId: number, approve: boolean) => {
        if (!authToken) return;
        setStatusMessage(null);
        
        try {
            const response = await fetch(`/api/admin/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ approve }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `Failed to ${approve ? 'approve' : 'reject'} product.`);
            }

            setStatusMessage(`Product ID ${productId} has been ${approve ? 'APPROVED' : 'REJECTED'}.`);

            // Refetch the list to update the UI
            fetchPendingProducts(authToken); 

        } catch (err: any) {
            setStatusMessage(`Error: ${err.message}`);
        }
    };

    if (loading && !error) {
        return <div className="p-10 text-center">Loading Admin Dashboard...</div>;
    }

    // 4. Render UI
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-indigo-700 mb-8 border-b pb-4">
                    Admin Product Approval Dashboard
                </h1>

                {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">{error}</div>}
                {statusMessage && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">{statusMessage}</div>}

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {products.length} Pending Approval Items
                </h2>

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.length === 0 && !loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        No products currently pending approval.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {product.vendor?.shopName || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">
                                            ₹{product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => handleApproval(product.id, true)}
                                                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleApproval(product.id, false)}
                                                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}