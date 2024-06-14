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
  brand: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Filter {
  categories?: string[];
  brands?: string[];
  rating?: string[];
  priceRange?: [number, number];
  searchTerm?: string;
}

interface ProductStore {
  products: any[];
  filteredProducts: any[];
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
  setFilter: (filter: Filter) => void;
  resetFilter: () => void;
  setSort: (sortCriteria: string) => void;
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
      set({ products: response, categories, isLoading: false });
      set({ filteredProducts: response });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  setFilter: (filter: Filter) => {
    const { products } = get();
    let filtered = products;

    if (
      filter.categories &&
      Array.isArray(filter.categories) &&
      filter.categories.length > 0
    ) {
      filtered = filtered.filter((product) =>
        filter.categories!.includes(product.category.name)
      );
    }

    if (
      filter.brands &&
      Array.isArray(filter.brands) &&
      filter.brands.length > 0
    ) {
      filtered = filtered.filter((product) =>
        filter.brands!.includes(product.brand)
      );
    }

    if (filter.priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.price >= filter.priceRange![0] &&
          product.price <= filter.priceRange![1]
      );
    }

    if (filter.searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(filter.searchTerm?.toLowerCase())
      );
    }

    set({ filteredProducts: filtered });
  },

  resetFilter: () => {
    const { products } = get();
    set({ filteredProducts: products });
  },

  filterProductsByCategory: (categoryName: string) => {
    const { products } = get();
    return products.filter((product) => product.category.name === categoryName);
  },

  setSort: (sortCriteria: string) => {
    const { filteredProducts } = get();
    let sortedProducts = [...filteredProducts];

    switch (sortCriteria) {
      case "Featured":
        sortedProducts.sort((a, b) => b.featured - a.featured);
        break;
      case "Discount":
        break;
      case "Price low to high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "Price high to low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    set({ filteredProducts: sortedProducts });
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
