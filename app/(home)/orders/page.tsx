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

const ProductPage = () => {
  const { userId, isAuthenticated } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
    }
  }, [isAuthenticated, router]);

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderbyuser", userId],
    queryFn: () => fetchOrderByUserId(userId as number),
    enabled: !!userId && isAuthenticated,
  });

  if (!isAuthenticated) return null;
  if (isLoading) return <OrdersSkeleton />;
  if (error) return <div>Error loading orders. Please try again later.</div>;
  if (!orders || orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
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
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
