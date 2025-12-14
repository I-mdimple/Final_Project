'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Used for dynamic client-side routing

// Define the key for storing the token (must match the key used in AddProduct)
const AUTH_TOKEN_KEY = "vendor_auth_token"; 

export default function VendorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/vendors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ⭐ CRITICAL STEP 1: Check for token and role in the response
        if (data.token && data.role) {
          // ⭐ CRITICAL STEP 2: Store the token in localStorage
          localStorage.setItem(AUTH_TOKEN_KEY, data.token);
          
          alert(`Login successful as ${data.role}! Redirecting to dashboard.`);
          
          // ⭐ CRITICAL STEP 3: Navigate based on the returned role
          if (data.role === 'ADMIN') {
            // Target for Admin users
            router.push("/admin/dashboard");
          } else if (data.role === 'VENDOR') {
            // Target for Vendor users
            router.push("/vendors/dashboard");
          } else {
            // Fallback for any other user role
            router.push("/dashboard"); 
          }

        } else {
          // Handle case where login was OK but token or role is missing
          throw new Error("Login successful, but token or role not received from the server.");
        }
      } else {
        // Display the error message returned by the API
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      // Catch network errors or errors thrown above
      setError(err.message || "An unexpected error occurred during login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 text-black">
      <div className="bg-white shadow-xl p-10 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Vendor/Admin Login
        </h1>
        
        {/* Error Feedback */}
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-md text-sm">
                **Error:** {error}
            </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded mt-1 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vendor@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded mt-1 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              disabled={loading}
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg mt-6 hover:bg-blue-700 transition duration-150 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/vendors/register" className="text-blue-600 underline hover:text-blue-800">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}