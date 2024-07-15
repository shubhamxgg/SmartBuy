import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import useCartStore from "@/store/useCartStore";
import Image from "next/image";

const OrderSummary = () => {
  const { cart } = useCartStore();

  const total = useMemo(
    () =>
      cart.items.reduce(
        (acc: number, item: { product: { price: number }; quantity: number }) =>
          acc + item.product.price * item.quantity,
        0
      ),
    [cart.items]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent>
        {cart.items.map((item) => (
          <div key={item.product.id} className="flex items-center mb-4">
            <Image
              src={item.product.imageUrl}
              alt={`${item.product.id}`}
              className="w-16 h-16 rounded"
              height={50}
              width={50}
            />
            <div className="ml-4 flex-1">
              <h3 className="font-semibold">{item.productId}</h3>
              <p className="text-sm">Quantity: {item.quantity}</p>
              <p className="text-sm">Price: ${item.product.price}</p>
            </div>
            <p className="font-semibold">
              ${item.product.price * item.quantity}
            </p>
          </div>
        ))}
        <div className="border-t pt-4 flex justify-end">
          <h3 className="text-lg font-semibold">
            Total Cost: ${total.toFixed(2)}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
