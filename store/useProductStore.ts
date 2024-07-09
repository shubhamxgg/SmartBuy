import { create } from "zustand";
import { Product } from "../type";
import { getProducts } from "@/lib/actions/product";

interface ProductStore {
  products: any[];
  filteredProducts: any[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  filterProductsByCategory: (categoryName: string) => Product[];
  resetFilter: () => void;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  filteredProducts: [],
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
}));

export default useProductStore;
