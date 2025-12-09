export default function OrdersPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
      <p className="text-gray-600 mb-6">Track all previous orders.</p>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">No orders found.</p>
      </div>
    </div>
  );
}
