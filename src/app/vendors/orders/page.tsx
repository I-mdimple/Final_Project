export default function VendorOrders() {
  const orders = [
    {
      id: "ORD-101",
      product: "Wireless Headphones",
      amount: 1999,
      buyer: "Rahul Kumar",
      status: "Pending",
    },
    {
      id: "ORD-102",
      product: "Blue T-Shirt",
      amount: 499,
      buyer: "Sneha Sharma",
      status: "Shipped",
    },
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">Customer Orders</h1>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Buyer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.product}</td>
                <td className="p-3">{order.buyer}</td>
                <td className="p-3">₹ {order.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Shipped"
                        ? "bg-green-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
