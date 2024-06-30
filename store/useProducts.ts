import { create } from "zustand";
import { CartItem, Product } from "../lib/type";
import { getProducts } from "@/lib/actions/get-products";
import { createCart } from "@/lib/actions/cart-items";

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  cart: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  filterProductsByCategory: (categoryName: string) => Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  filteredProducts: [],
  cart: [],
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

  addToCart: async (product: Product) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      const newItem = { ...product, quantity: 1 };
      await createCart({ productId: product.id, quantity: 1 });
      set({ cart: [...cart, newItem] });
    }
  },

  removeFromCart: (productId: number) => {
    const { cart } = get();
    set({ cart: cart.filter((item) => item.id !== productId) });
  },

  updateCartItemQuantity: (productId: number, quantity: number) => {
    const { cart } = get();
    set({
      cart: cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    });
  },

  clearCart: () => {
    set({ cart: [] });
  },
}));

export default useProductStore;
