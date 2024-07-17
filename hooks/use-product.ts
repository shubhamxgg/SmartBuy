import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SearchParams } from "@/lib/schemas";

export const useProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchProducts = useCallback(async () => {
    const response = await fetch(`/api/search?${searchParams}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch products");
    }
    return response.json();
  }, [searchParams]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", searchParams.toString()],
    queryFn: fetchProducts,
  });

  const updateFilters = useCallback(
    (newFilters: Partial<SearchParams>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });
      router.push(`/search?${params}`);
    },
    [router, searchParams]
  );

  return {
    products: data?.products ?? [],
    totalPages: data?.totalPages ?? 1,
    isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "An unexpected error occurred"
      : null,
    updateFilters,
  };
};
