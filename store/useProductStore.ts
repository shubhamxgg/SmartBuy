import { create } from "zustand";
import { CartItems, Product } from "../lib/type";

import {
  clearCartItem,
  createCartItem,
  getCartItem,
  removeCartItem,
  updateCartItem,
} from "@/lib/actions/cart";
import { getProducts } from "@/lib/actions/product";

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  cart: any[];
  cartId: number;
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchCart: () => Promise<void>;
  filterProductsByCategory: (categoryName: string) => Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: (cartId: number) => void;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  filteredProducts: [],
  cart: [],
  cartId: 0,
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getProducts();
      const categories = Array.from(
        new Set(response.map((product) => product.category.name))
      );
      set({
        products: response,
        categories,
        filteredProducts: response,
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  resetFilter: () => {
    const { products } = get();
    set({ filteredProducts: products });
  },

  filterProductsByCategory: (categoryName: string) => {
    const { products } = get();
    return products.filter((product) => product.category.name === categoryName);
  },

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const { cartId, items } = await getCartItem();
      set({ cartId, cart: items, isLoading: false });
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

export default useProductStore;
