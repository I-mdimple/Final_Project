// src/components/Header.tsx
import Link from 'next/link';
import { ShoppingCart, User, Wrench } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

// Note: In a real app, user and role context would be fetched here
const DUMMY_ROLE = 'USER'; // 'USER', 'VENDOR', 'ADMIN'

export default function Header() {
  const { items } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-800 text-white shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold text-teal-400">
          ⚡ GadgetHub
        </Link>
        <nav className="flex space-x-6 items-center">
          <Link href="/products" className="hover:text-teal-400 transition-colors">
            Browse
          </Link>

          {DUMMY_ROLE === 'VENDOR' && (
            <Link href="/vendor/dashboard" className="hover:text-teal-400 transition-colors flex items-center">
              <Wrench className="w-4 h-4 mr-1" /> Vendor Dashboard
            </Link>
          )}

          {DUMMY_ROLE === 'ADMIN' && (
            <Link href="/admin/dashboard" className="hover:text-teal-400 transition-colors flex items-center">
              <Wrench className="w-4 h-4 mr-1" /> Admin Panel
            </Link>
          )}

          <Link href="/cart" className="relative hover:text-teal-400 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          <Link href="/login" className="flex items-center hover:text-teal-400 transition-colors">
            <User className="w-5 h-5 mr-1" /> Login
          </Link>
        </nav>
      </div>
    </header>
  );
}