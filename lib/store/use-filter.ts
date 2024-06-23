// lib/store/use-products.ts
import { create } from "zustand";

interface ProductStore {
  currentPage: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export const useFilteredStore = create<ProductStore>((set) => ({
  currentPage: 1,
  pageSize: 10,
  setPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size }),
}));
