"use client";
import { useEffect, useState } from "react";
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
import { useOrder } from "@/hooks/use-order";

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const { isAuthenticated } = useUserAuth();
  const { openModal } = useAuthModalStore();

  useEffect(() => {
    if (!isAuthenticated) {
      openModal();
    }
  }, [isAuthenticated, openModal]);

  const {
    orders,
    error,
    isLoading,
    refetch,
    total,
    limit,
    page: currentPage,
  } = useOrder(page);

  if (isLoading) return <OrdersSkeleton />;

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
  console.log(orders);
  const totalPages = Math.ceil(total / limit);

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
        {orders?.map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button
          disabled={currentPage <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <Button
          disabled={currentPage >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default OrdersPage;
