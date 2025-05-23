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
import { Trash2Icon } from "lucide-react";

const OrderSummary = () => {
  const { cart, removeFromCart } = useCartStore();

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
              <h3 className="font-semibold">{item.product.title}</h3>
              <p className="text-sm">Quantity: {item.quantity}</p>
              <p className="text-sm">
                Price: ${Math.round(item.product.price)}
              </p>
            </div>
            <p className="font-semibold">
              ${Math.round(item.product.price * item.quantity)}
            </p>
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="ml-4 text-sm text-red-500"
            >
              <Trash2Icon className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="border-t pt-4 flex justify-end">
          <h3 className="text-lg font-semibold">
            Total Cost: ${Math.round(total)}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
