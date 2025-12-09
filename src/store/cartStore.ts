// src/store/cartStore.ts
import { create } from 'zustand';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (newItem) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.productId === newItem.productId);

      if (existingItem) {
        // Increase quantity
        return {
          items: state.items.map((item) =>
            item.productId === newItem.productId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        // Add new item
        return { items: [...state.items, { ...newItem, quantity: 1 }] };
      }
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items
        .map((item) => (item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
  getTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
}));