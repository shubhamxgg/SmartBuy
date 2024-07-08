"use client";

import { fetchOrderByUserId } from "@/lib/actions/orders";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";

const OrdersPage = () => {
  const userId = 1;
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderbyuser", userId],
    queryFn: () => fetchOrderByUserId(userId!),
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!orders) return <div>No orders</div>;

  return (
    <div className="max-w-5xl mx-auto my-8">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink href="/orders"> Your Orders</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row justify-between items-center w-full">
              <div className="text-primary text-xl">Order #{order.id}</div>
              <Button variant="link" className="text-primary">
                <Link href={`/orders/${order.id}`}>View Order Details</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 relative">
                    <Image
                      src={order.image}
                      alt={`Order ${order.id}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="text-lg text-muted-foreground">
                      Ordered Placed :  {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-md text-muted-foreground">Total: ${order.totalAmount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Status: {order.status}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
