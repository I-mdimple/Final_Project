"use client";

import { useState } from "react";
import Link from "next/link";

export default function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const response = await fetch("/api/vendors/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful!");
      // navigate to vendor dashboard
      window.location.href = "/vendors/dashboard";
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert("Something went wrong.");
    console.error(error);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl p-10 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Vendor Login
        </h1>

        <div className="space-y-4">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded mt-1"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vendor@example.com"
            />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded mt-1"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-6 hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/vendors/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
