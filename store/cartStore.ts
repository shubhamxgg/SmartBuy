import { create } from "zustand";
import { CartItems, Product } from "../lib/type";

import {
  CartResponse,
  clearCartItem,
  createCartItem,
  getCartItem,
  removeCartItem,
  updateCartItem,
} from "@/lib/actions/cart";

interface CartStore {
  cart: any[];
  cartId: number;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: (cartId: number) => void;
}

const cartStore = create<CartStore>((set, get) => ({
  cart: [],
  cartId: 0,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response: CartResponse = await getCartItem();
      set({ cartId: response.cartId, cart: response.items, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addToCart: async (product: Product) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.productId === product.id);
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      await updateCartItem(updatedItem);
      set({
        cart: cart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      const newItem = await createCartItem({
        productId: product.id,
        quantity: 1,
      });
      set({ cart: [...cart, newItem] });
    }
  },

  removeFromCart: async (productId: number) => {
    const { cart } = get();
    try {
      await removeCartItem({ productId });
      set({ cart: cart.filter((item) => item.productId !== productId) });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateCartItemQuantity: async (productId: number, quantity: number) => {
    const { cart } = get();
    try {
      const updatedItem = await updateCartItem({ productId, quantity });
      set({
        cart: cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearCart: async (cartId: number) => {
    try {
      await clearCartItem(cartId);
      set({ cart: [] });
    } catch (error: any) {
      set({ error: error.message });
    }
    set({ cart: [] });
  },
}));
export default cartStore;
