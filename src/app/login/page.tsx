'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // ⭐ Import useRouter

// Define types based on your backend structure
// Note: These types are technically not needed in this pure Login component,
// but kept for completeness.
type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string;
  isApproved: boolean;
  images: Array<{ url: string; isPrimary: boolean }>;
};

type UserRole = 'customer' | 'vendor' | 'admin';

type UserData = {
  id: number;
  email: string;
  role: UserRole; // Use the specific union type
  name: string;
};

// Define the key for localStorage
const AUTH_TOKEN_KEY = "vendor_auth_token"; 

export default function LoginPage() {
  const router = useRouter(); // ⭐ Initialize useRouter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Cleaned up state variables (not strictly needed for redirection)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Step 1: Handle Login ---
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        const errData = await loginResponse.json();
        throw new Error(errData.error || 'Login failed.');
      }

      const data = await loginResponse.json();
      
      // ⭐ NEW: Data structure check (must match backend response)
      if (!data.token || !data.role) {
          throw new Error("Authentication error: Token or Role missing from response.");
      }
      
      // ⭐ FIX: Convert the role to lowercase for reliable comparison
      const userRole = data.role.toLowerCase();

      // 1. Save Token and Role to localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      localStorage.setItem('user_role', userRole); // Save the lowercase role

      // 2. Redirect based on role
      if (userRole === 'admin') {
          router.push('/admin/dashboard');
      } else if (userRole === 'vendor') {
          router.push('/vendors/dashboard'); // Or the page where products are submitted/viewed
      } else {
          router.push('/'); // Default for 'customer' or others
      }
      
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };
  
  // --- Render Logic (Simplified to focus on Login) ---
  return (
    // Main container uses light gray background for contrast with white cards/form
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Sign In
        </h1>
        
        {/* Error and Loading Feedback */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-sm" role="alert">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        {loading && <p className="text-center text-blue-600 font-medium mb-4">Authenticating...</p>}

        {/* Login Form */}
        <div className="bg-white p-8 border border-gray-100 rounded-xl shadow-2xl max-w-lg mx-auto text-black">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Sign In to Your Account</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-200 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}