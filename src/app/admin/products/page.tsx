"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  isApproved: boolean;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending products
  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ FIXED: Approve product using [id] route + PUT
  const approveProduct = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approve: true }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Approval failed");
        return;
      }

      // Remove approved product from UI
      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Approve product error:", error);
      alert("Something went wrong while approving product");
    }
  };

  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Admin – Pending Products
      </h1>

      {products.length === 0 ? (
        <p>No pending products 🎉</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-500">₹{product.price}</p>
              </div>

              <button
                onClick={() => approveProduct(product.id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
