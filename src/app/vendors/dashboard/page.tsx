export default function VendorDashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">Vendor Dashboard</h1>

      <p className="text-gray-700 mt-3">Welcome! Manage your shop here.</p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <a
          href="/vendors/products"
          className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Your Products</h2>
          <p className="text-gray-600 mt-2">Add, update and manage products.</p>
        </a>

        <a
          href="/vendors/orders"
          className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-gray-600 mt-2">View and manage customer orders.</p>
        </a>

        <a
          href="/vendors/profile"
          className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-gray-600 mt-2">Edit your vendor details.</p>
        </a>
      </div>
    </div>
  );
}
