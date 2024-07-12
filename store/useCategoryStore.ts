import { getCategories } from "@/lib/actions/category";
import { create } from "zustand";

interface Category {
  id: number;
  name: string;
}

interface CategoryStore {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  addCategory: (category: Category) => void;
  removeCategory: (id: number) => void;
  updateCategory: (id: number, updatedCategory: Partial<Category>) => void;
  isLoading: boolean;
  error: string | null;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  isLoading: false,
  error: null,
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getCategories();
      set({ categories: response, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false, categories: [] });
    }
  },
  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),
  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
  updateCategory: (id, updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      ),
    })),
}));

export default useCategoryStore;
