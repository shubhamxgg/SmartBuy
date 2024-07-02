import React from "react";
import Image from "next/image";
import cartStore from "@/store/cartStore";
import { CartItems } from "@/lib/type";

interface CartItemProps {
  item: CartItems;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateCartItemQuantity } = cartStore();
  if (!item || !item.product) {
    return null;
  }

  return (
    <div className="flex items-center border-b py-4">
      <Image
        src={item.product.imageUrl}
        alt={"image"}
        width={80}
        height={80}
        className="mr-4 aspect-square w-full h-full "
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
