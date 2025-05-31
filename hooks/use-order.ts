import { fetchOrderByUserId } from "@/lib/actions/orders";
import { useQuery } from "@tanstack/react-query";
import { useUserAuth } from "./use-auth";

async function fetchOrders(userId: string, page: number) {
  const params = new URLSearchParams();
  params.set("userId", userId);
  params.set("page", String(page));
  params.set("limit", "10");

  const response = await fetch(`/api/orders?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
}

export function useOrder(page: number = 1) {
  const { userId } = useUserAuth();
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["orders", userId, page],
    queryFn: () => fetchOrders(userId as any, page),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: 1000,
  });

  return {
    orders: data?.orders || [],
    refetch,
    error,
    isLoading,
    total: data?.total || 0,
    limit: data?.limit || 10,
    page: data?.page || 1,
  };
}
