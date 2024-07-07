"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { fetchOrderById } from "@/lib/actions/orders";
import { Order } from "@/lib/type";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const orderId = typeof id === "string" ? parseInt(id, 10) : undefined;

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderById(orderId!),
    enabled: !!orderId,
  });

  if (isLoading) return <div>Loading order details...</div>;
  if (error) return <div>Error loading order details</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order #{order.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Order Information</h2>
              <p>Status: {order.status}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Shipping Status: {order.shippingStatus}</p>
              <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
            </div>
            {/* <div>
              <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div> */}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Order Items</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Product</th>
                  <th className="text-left">Quantity</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.productId}>
                    <td>Product {item.productId}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsPage;
