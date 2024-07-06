import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import useProductStore from "@/store/useProductStore";
import Image from "next/image";

const OrderSummary = () => {
  const { cart } = useProductStore();

  const totalCost = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent>
        {cart.map((item) => (
          <div key={item.product.id} className="flex items-center mb-4">
            <Image
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-16 h-16 rounded"
              height={50}
              width={50}
            />
            <div className="ml-4 flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
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
            Total Cost: ${totalCost.toFixed(2)}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
