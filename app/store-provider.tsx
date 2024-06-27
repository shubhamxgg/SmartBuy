"use client";

import useProductStore from "@/store/useProducts";
import React, { ReactNode } from "react";
import { useEffect } from "react";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const { fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return <>{children}</>;
};

export default StoreProvider;
