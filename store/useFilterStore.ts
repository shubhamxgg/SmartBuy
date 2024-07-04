import { create } from "zustand";

export type SortOptionKey =
  | "featured"
  | "discount"
  | "priceLowToHigh"
  | "priceHighToLow"
  | null;

export interface FilterState {
  selectedCategories: string[];
  selectedBrands: string[];
  selectedRating: number | null;
  priceRange: [number, number];
  currentPage: number;
  pageSize: number;
  products: any[];
  totalProducts: number;
  sort: SortOptionKey;
  setCategoryFilter: (categories: string[]) => void;
  setBrandFilter: (brands: string[]) => void;
  setRatingFilter: (rating: number | null) => void;
  setPriceRange: (priceRange: [number, number]) => void;
  setSortFilter: (sort: SortOptionKey) => void;
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
  sort: null,
  setCategoryFilter: (categories) => set({ selectedCategories: categories }),
  setBrandFilter: (brands) => set({ selectedBrands: brands }),
  setRatingFilter: (rating) => set({ selectedRating: rating }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setSortFilter: (sort) => set({ sort }),
  resetFilters: () =>
    set({
      selectedCategories: [],
      selectedBrands: [],
      selectedRating: null,
      priceRange: [0, 1000],
      sort: null,
    }),
}));
