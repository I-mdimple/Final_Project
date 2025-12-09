"use client";

import { useState } from "react";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const handleSubmit = () => {
    alert("Product added (API integration coming soon!)");
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Add New Product</h1>

        <div className="space-y-4">
          <div>
            <label className="font-medium">Product Name</label>
            <input
              className="w-full border px-3 py-2 rounded mt-1"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Example: Wireless Headphones"
            />
          </div>

          <div>
            <label className="font-medium">Price (₹)</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded mt-1"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="1999"
            />
          </div>

          <div>
            <label className="font-medium">Stock</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded mt-1"
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              placeholder="10"
            />
          </div>

          <div>
            <label className="font-medium">Description</label>
            <textarea
              className="w-full border px-3 py-2 rounded mt-1"
              rows={4}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Write product details here..."
            ></textarea>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-6 hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
