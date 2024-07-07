"use client";
import { fetchOrderByUserId } from "@/lib/actions/orders";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>error</div>;
  if (!orders) return <div>no orders </div>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p>Total: ${order.totalAmount.toFixed(2)}</p>
                  <p>Status: {order.status}</p>
                </div>
                <Button variant={"link"}>
                  <Link href={`/orders/${order.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
