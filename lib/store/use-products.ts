// stores/productStore.ts
import { create } from "zustand";
import { getProducts } from "../actions/get-products";

interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  seller: { id: number; user: { name: string } };
  status: string;
  featured: boolean;
  stock: { sku: string; quantity: number; lowStockThreshold: number };
  images: { id: number; url: string }[];
  reviews: { id: number; rating: number; comment: string }[];
  category: Category;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductStore {
  products: any[];
  categories: any[];
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
      set({ products: response, categories, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  filterProductsByCategory: (categoryName: string) => {
    const { products } = get();
    return products.filter((product) => product.category.name === categoryName);
  },

  addToCart: (product: Product) => {
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
      set({ cart: [...cart, { ...product, quantity: 1 }] });
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
