"use client";

import Link from "next/link";

export default function VendorProducts() {
  // TODO: later fetch vendor products from Prisma
  const products = [
    { id: 1, name: "Blue T-Shirt", price: 499, stock: 20 },
    { id: 2, name: "Wireless Headphones", price: 1999, stock: 12 },
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">Your Products</h1>

      <div className="mt-4">
        <Link
          href="/vendors/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add New Product
        </Link>
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">{p.name}</h2>
            <p className="text-gray-500 mt-2">₹ {p.price}</p>
            <p className="text-gray-500">Stock: {p.stock}</p>

            <div className="mt-4 flex gap-2">
              <button className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
