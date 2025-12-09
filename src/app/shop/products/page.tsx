export default function ProductsPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <p className="text-gray-600 mb-6">Browse all available items.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TEMPORARY SAMPLE PRODUCT */}
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">Product {item}</h2>
            <p className="text-gray-500">Description here...</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

