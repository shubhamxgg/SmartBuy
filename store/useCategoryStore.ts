import { getCategories, createCategory } from "@/lib/actions/category";
import { create } from "zustand";

interface Category {
  id: number;
  name: string;
}

interface CategoryStore {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<Category>;
}

const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const categories = await getCategories();
      set({ categories, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  addCategory: async (name: string) => {
    try {
      const newCategory = await createCategory({ name });
      set((state) => ({
        categories: [...state.categories, newCategory],
      }));
      return newCategory;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
}));

export default useCategoryStore;