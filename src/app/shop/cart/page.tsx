export default function CartPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <p className="text-gray-600 mb-6">Items you have added to the cart.</p>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    </div>
  );
}
