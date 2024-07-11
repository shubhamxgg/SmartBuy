"use client";

import { useMemo } from "react";
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
import { useUserId } from "@/hooks/use-user-id";

const OrdersPage = () => {
  const userId = useUserId();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderbyuser", userId],
    queryFn: () => fetchOrderByUserId(userId as number),
    enabled: !!userId,
  });

  if (isLoading) return <OrdersSkeleton />;
  if (error) return <div>Error loading orders. Please try again later.</div>;
  if (!orders || orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="max-w-5xl mx-auto my-8">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink href="/orders">Your Orders</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
