import { create } from "zustand";
import { getCategories } from "../actions/get-category";

interface Category {
  id: number;
  name: string;
}

interface CategoryStore {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  addCategory: (category: Category) => void;
  isLoading: boolean;
  error: string | null;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  isLoading: false,
  error: null,
  fetchCategories: async () => {
    try {
      const response = await getCategories();
      set({ categories: response });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),
}));

export default useCategoryStore;
