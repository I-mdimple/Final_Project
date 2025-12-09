// src/components/ProductCard.tsx
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: { url: string; isPrimary: boolean }[];
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const primaryImage = product.images.find(img => img.isPrimary)?.url || '/placeholder.png';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: primaryImage,
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="block border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        {/* Replace with actual Next.js Image component */}
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${primaryImage})` }}></div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-red-500 bg-opacity-70 flex items-center justify-center">
            <span className="text-white text-xl font-bold transform -rotate-12">OUT OF STOCK</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <p className="text-teal-600 font-bold text-xl mt-1">${product.price.toFixed(2)}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            Stock: {product.stock}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`p-2 rounded-full transition-colors ${
              product.stock > 0
                ? 'bg-teal-500 text-white hover:bg-teal-600'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}