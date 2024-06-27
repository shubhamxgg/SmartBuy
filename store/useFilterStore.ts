import { create } from "zustand";

export interface FilterState {
  selectedCategories: string[];
  selectedBrands: string[];
  selectedRating: number | null;
  priceRange: [number, number];
  currentPage: number;
  pageSize: number;
  products: any[];
  totalProducts: number;
  setCategoryFilter: (categories: string[]) => void;
  setBrandFilter: (brands: string[]) => void;
  setRatingFilter: (rating: number | null) => void;
  setPriceRange: (priceRange: [number, number]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategories: [],
  selectedBrands: [],
  selectedRating: null,
  priceRange: [0, 1000],
  currentPage: 1,
  pageSize: 10,
  products: [],
  totalProducts: 0,
  setCategoryFilter: (categories) => set({ selectedCategories: categories }),
  setBrandFilter: (brands) => set({ selectedBrands: brands }),
  setRatingFilter: (rating) => set({ selectedRating: rating }),
  setPriceRange: (priceRange) => set({ priceRange }),
  resetFilters: () =>
    set({
      selectedCategories: [],
      selectedBrands: [],
      selectedRating: null,
      priceRange: [0, 1000],
    }),
}));
