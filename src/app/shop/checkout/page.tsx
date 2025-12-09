export default function CheckoutPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="text-gray-600 mb-6">Enter details to complete your purchase.</p>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <div>
          <label className="block font-medium">Full Name</label>
          <input className="border w-full p-2 rounded mt-1" />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input className="border w-full p-2 rounded mt-1" />
        </div>

        <div>
          <label className="block font-medium">Payment Method</label>
          <select className="border w-full p-2 rounded mt-1">
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit Card</option>
          </select>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg">
          Place Order
        </button>

      </div>
    </div>
  );
}
