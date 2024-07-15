import React from "react";
import Image from "next/image";
import { CartItems } from "@/type";

import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { Button } from "../ui/button";

interface CartItemProps {
  item: CartItems;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateCartItemQuantity } = useCartStore();

  if (!item || !item.product) {
    return null;
  }

  return (
    <div className="flex items-center py-4 border-b border-gray-700">
    <div className="flex-shrink-0 w-20 h-20 bg-white rounded-md overflow-hidden mr-4">
      <Image
        src={item.product.imageUrl}
        alt={item.product.title}
        width={80}
        height={80}
        className="object-contain p-2 w-full h-full"
      />
    </div>
    <div className="flex-grow">
      <h4 className="font-semibold text-lg mb-1">{item.product.title}</h4>
      <div className="flex items-center mt-2">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full"
          onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
        <span className="mx-3 font-semibold">{item.quantity}</span>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full"
          onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div className="flex flex-col items-end ml-4">
      <span className="font-semibold text-lg">
        ${(item.product.price * Number(item.quantity)).toFixed(2)}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-400 hover:text-red-300 mt-2"
        onClick={() => removeFromCart(item.product.id)}
      >
        <Trash2Icon className="h-4 w-4 mr-1" />
        Remove
      </Button>
    </div>
    </div>
  );
};

export default CartItem;
