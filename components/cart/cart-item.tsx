import React from "react";
import Image from "next/image";
import { CartItems } from "@/type";

import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import useCartStore from "@/store/useCartStore";

interface CartItemProps {
  item: CartItems;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateCartItemQuantity } = useCartStore();

  if (!item || !item.product) {
    return null;
  }

  return (
    <div className="flex items-center bg- rounded-lg py-4 mb-4 text-white">
      <div className="flex items-center">
        <div className="relative w-16 h-16 mr-4">
          <Image
            src={item.product.imageUrl}
            alt={"image"}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-200">{item.product.title}</h4>
          <div className="flex items-center mt-2 text-gray-400">
            <button
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
              onClick={() =>
                updateCartItemQuantity(item.product.id, item.quantity - 1)
              }
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <input
              type="number"
              value={item.quantity || 0}
              min="1"
              className="bg-transparent border-none text-center w-8 mx-2 focus:outline-none text-white"
              onChange={(e) =>
                updateCartItemQuantity(
                  item.product.id,
                  parseInt(e.target.value)
                )
              }
            />
            <button
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
              onClick={() =>
                updateCartItemQuantity(item.product.id, item.quantity + 1)
              }
            >
              <PlusIcon className="h-4 w-4" />
            </button>
            <button
              className="ml-4 text-red-500 hover:text-red-400 transition-colors"
              onClick={() => removeFromCart(item.product.id)}
            >
              <Trash2Icon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="ml-auto font-semibold text-gray-200">
        ${item.product.price * Number(item.quantity) || 0}
      </div>
    </div>
  );
};

export default CartItem;
