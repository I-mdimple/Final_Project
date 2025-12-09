interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = params;

  // Later you can fetch real product data using Prisma or an API
  // For now, we use a placeholder product
  const product = {
    id,
    name: `Product ${id}`,
    description: "This is a sample product description.",
    price: 1999,
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

      <p className="text-gray-600 mb-4">{product.description}</p>

      <p className="text-2xl font-semibold mb-6 text-blue-600">
        ₹{product.price}
      </p>

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
        Add to Cart
      </button>

      <div className="mt-10">
        <a
          href="/shop/products"
          className="text-blue-600 underline hover:text-blue-800"
        >
          ← Back to Products
        </a>
      </div>
    </div>
  );
}
