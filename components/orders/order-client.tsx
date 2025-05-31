"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderByUserId } from "@/lib/actions/orders";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import OrdersSkeleton from "@/components/orders/orders-skeleton";
import OrderCard from "@/components/orders/order-card";
import { useUserAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import useAuthModalStore from "@/store/useAuthModalStore";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { RetryButton } from "../retry-button";

const OrdersPage = () => {
  const { userId, isAuthenticated } = useUserAuth();
  const { openModal } = useAuthModalStore();

  useEffect(() => {
    if (!isAuthenticated) {
      openModal();
    }
  }, [isAuthenticated, openModal]);

  const {
    data: orders,
    isLoading: isOrdersLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orderbyuser", userId],
    queryFn: () => fetchOrderByUserId(userId as number),
    enabled: !!userId && isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  if (isOrdersLoading) return <OrdersSkeleton />;

  if (error) return <RetryButton error={error.message} onClick={refetch} />;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
        <p className="mb-4">Please log in to view your orders.</p>
        <Button onClick={openModal}>Log In</Button>
      </div>
    );
  }

  if (error) return <div>Error loading orders. Please try again later.</div>;
  if (!orders || orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="space-y-4 max-w-screen-lg mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/orders">Orders</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
