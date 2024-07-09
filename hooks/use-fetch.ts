import useProductStore from "@/store/useProductStore";
import { Filter } from "@/type";
import { useEffect, useState } from "react";

export const useFetchAndFilterProducts = (initialFilter: Filter) => {
  const {
    fetchProducts,
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

  useEffect(() => {}, [isFetched, initialFilter]);

  return { products, filteredProducts, isLoading, error };
};
