export default function ShopNamesPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Vendor Shops</h1>
      <p className="text-gray-600 mb-6">Explore shops from different vendors.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {[1, 2, 3].map((shop) => (
          <a
            key={shop}
            href={`/shop/shopnames/${shop}`}
            className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="font-semibold text-xl">Shop {shop}</h2>
            <p className="text-gray-500">Click to view their products</p>
          </a>
        ))}

      </div>
    </div>
  );
}
