import React from "react";
import Image from "next/image";
import cartStore from "@/store/cartStore";
import { CartItems } from "@/lib/type";
import useProductStore from "@/store/useProducts";

interface CartItemProps {
  item: CartItems;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateCartItemQuantity } = useProductStore();
  if (!item || !item.product) {
    return null;
  }

  return (
    <div className="flex items-center border-b py-4">
      <Image
        src={item.product.imageUrl}
        alt={"image"}
        width={20}
        height={20}
        className="mr-4 h-16 w-16 rounded-sm border-2 border-red-200"
      />
      <div className="flex-1">
        <h4 className="font-semibold">{item.product.title}</h4>
        <div className="flex items-center mt-2">
          <input
            type="number"
            value={item.quantity || 0}
            min="1"
            className="border p-1 w-12"
            onChange={(e) =>
              updateCartItemQuantity(item.product.id, parseInt(e.target.value))
            }
          />
          <button
            className="ml-4 text-red-500"
            onClick={() => removeFromCart(item.product.id)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="ml-4 font-semibold">
        ${item.product.price * Number(item.quantity) || 0}
      </div>
    </div>
  );
};

export default CartItem;
