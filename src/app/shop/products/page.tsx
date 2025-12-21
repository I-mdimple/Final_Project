"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category");

  return (
    <div className="p-10 min-h-screen bg-gray-50">

      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        Products Catalog
      </h1>

      {/* Category Indicator */}
      {category && (
        <p className="text-lg text-gray-600 mb-6">
          Showing results for:{" "}
          <span className="font-semibold capitalize text-purple-600">
            {category}
          </span>
        </p>
      )}

      <p className="text-lg text-gray-600 mb-10">
        Browse all available items and find your perfect match.
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
          >
            {/* Image Placeholder */}
            <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image Placeholder</span>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 truncate">
                Product Name #{item}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Category: {category ?? "all"}
              </p>

              <p className="text-2xl font-extrabold text-purple-600 mt-3">
                ${(29.99 * item).toFixed(2)}
              </p>

              {/* View Details */}
              <button
                onClick={() => router.push(`/shop/products/${item}`)}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
