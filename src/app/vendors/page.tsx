import Link from "next/link";

export default function VendorsHome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Become a Vendor
      </h1>

      <p className="text-gray-700 text-center max-w-xl mb-8">
        Join our marketplace and start selling your products on ShopHub!
      </p>

      <div className="flex gap-6">
        <Link
          href="/vendors/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Register as Vendor
        </Link>

        <Link
          href="/vendors/login"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
        >
          Vendor Login
        </Link>
      </div>
    </div>
  );
}
