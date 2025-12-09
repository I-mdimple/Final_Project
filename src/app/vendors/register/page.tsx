"use client";

import { useState } from "react";
import Link from "next/link";

export default function VendorRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
  });

  const handleSubmit = async () => {
  try {
    const response = await fetch("/api/vendors/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Vendor registered successfully!");
    } else {
      alert("Error: " + data.error);
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
          Vendor Registration
        </h1>

        <div className="space-y-4">
          <div>
            <label className="font-medium">Full Name</label>
            <input
              className="w-full border px-3 py-2 rounded mt-1"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="font-medium">Shop Name</label>
            <input
              className="w-full border px-3 py-2 rounded mt-1"
              onChange={(e) => setForm({ ...form, shopName: e.target.value })}
              placeholder="My Awesome Store"
            />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded mt-1"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="vendor@example.com"
            />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded mt-1"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="********"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-6 hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already a vendor?{" "}
          <Link href="/vendors/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
