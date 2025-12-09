export default function ShopHome() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">Shop</h1>
      <p className="text-lg text-gray-600 mb-6">
        Browse categories, shops, and products.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          href="/shop/products"
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="font-semibold text-xl">Products</h2>
          <p className="text-gray-500">Explore all products</p>
        </a>

        <a
          href="/shop/shopnames"
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="font-semibold text-xl">Shops</h2>
          <p className="text-gray-500">Browse vendor shops</p>
        </a>

        <a
          href="/shop/cart"
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="font-semibold text-xl">Cart</h2>
          <p className="text-gray-500">View your cart</p>
        </a>

        <a
          href="/shop/orders"
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="font-semibold text-xl">Orders</h2>
          <p className="text-gray-500">Track your orders</p>
        </a>

        <a
          href="/shop/checkout"
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="font-semibold text-xl">Checkout</h2>
          <p className="text-gray-500">Complete your purchase</p>
        </a>
      </div>
    </div>
  );
}


