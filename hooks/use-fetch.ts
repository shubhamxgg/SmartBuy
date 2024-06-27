import useProductStore from "@/store/useProducts";
import { Filter } from "@/lib/type";
import { useEffect, useState } from "react";

export const useFetchAndFilterProducts = (initialFilter: Filter) => {
  const {
    fetchProducts,
    setFilter,
    isLoading,
    error,
    products,
    filteredProducts,
  } = useProductStore();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      setIsFetched(true);
    };

    fetchData();
  }, [fetchProducts]);

  useEffect(() => {
    if (isFetched) {
      setFilter(initialFilter);
    }
  }, [isFetched, initialFilter, setFilter]);

  return { products, filteredProducts, isLoading, error };
};
