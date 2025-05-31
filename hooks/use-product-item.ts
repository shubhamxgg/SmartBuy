import { getProductById } from "@/lib/actions/product";
import { useQuery } from "@tanstack/react-query";

export const useItemData = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: 1000,
    gcTime: 1000 * 60 * 10,
  });
};
