import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Welcome to <span className="text-yellow-300">ShopHub</span>
            </h1>
            <p className="mt-5 text-lg text-gray-200">
              A smart multi-vendor ecommerce platform where you can buy, sell,
              and explore amazing products — powered with AI support.
            </p>

            <div className="mt-8 flex gap-4">
              <Link 
                href="/products" 
                className="bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
              >
                Start Shopping
              </Link>

              <Link 
                href="/vendors" 
                className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
              >
                Become a Vendor
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <Image
              src="/hero-shopping.png"
              alt="Shopping Illustration"
              width={500}
              height={500}
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Shop by Category</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: "Electronics", img: "/cat-electronics.jpg" },
            { name: "Fashion", img: "/cat-fashion.jpg" },
            { name: "Home & Decor", img: "/cat-home.jpg" },
            { name: "Beauty", img: "/cat-beauty.jpg" },
          ].map((cat, idx) => (
            <div 
              key={idx}
              className="bg-white shadow hover:shadow-lg transition rounded-lg overflow-hidden cursor-pointer group"
            >
              <div className="h-40 relative">
                <Image 
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
              <h3 className="p-4 font-semibold text-gray-800">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Products</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
              >
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <h3 className="font-semibold text-gray-800">Product Name</h3>
                <p className="text-gray-500 text-sm">Short description here</p>
                <p className="font-bold text-blue-600 mt-2">$29.99</p>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
