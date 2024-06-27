import React from "react";
import useProductStore from "@/store/useProducts";
import Image from "next/image";

interface CartItem {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
}

interface CartItemProps {
  item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateCartItemQuantity } = useProductStore();

  return (
    <div className="flex items-center border-b py-4">
      <Image
        src={item.imageUrl}
        alt={item.title}
        width={80}
        height={80}
        className="mr-4"
      />
      <div className="flex-1">
        <h4 className="font-semibold">{item.title}</h4>
        {/* <p className="text-gray-500">{item.description}</p> */}
        <div className="flex items-center mt-2">
          <input
            type="number"
            value={item.quantity}
            min="1"
            className="border p-1 w-12"
            onChange={(e) =>
              updateCartItemQuantity(item.id, parseInt(e.target.value))
            }
          />
          <button
            className="ml-4 text-red-500"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="ml-4 font-semibold">${item.price * item.quantity}</div>
    </div>
  );
};

export default CartItem;
