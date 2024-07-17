import React from "react";
import { CartItems } from "@/type";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import CartCardImage from "./cart-card-image";
import CartUpdateButton from "./cart-update-button";

interface CartItemProps {
  item: CartItems;
}

const CartCard = ({ item }: CartItemProps) => {
  const { removeFromCart, updateCartItemQuantity } = useCartStore();

  if (!item || !item.product) {
    return null;
  }

  const { product, quantity } = item;
  const { id, title, imageUrl, price } = product;

  const handleQuantityDecrease = () => {
    updateCartItemQuantity(id, quantity - 1);
  };
  const handleQuantityIncrease = () => {
    updateCartItemQuantity(id, quantity + 1);
  };
  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-700">
      <CartCardImage imageUrl={imageUrl} title={title} />
      <div className="flex-grow">
        <h4 className="font-semibold text-lg mb-1">{title}</h4>
        <div className="flex items-center mt-2">
          <CartUpdateButton
            icon={<MinusIcon className="h-4 w-4" />}
            onClick={handleQuantityDecrease}
          />
          <span className="mx-3 font-semibold">{item.quantity}</span>
          <CartUpdateButton
            icon={<PlusIcon className="h-4 w-4" />}
            onClick={handleQuantityIncrease}
          />
        </div>
      </div>
      <div className="flex flex-col items-end ml-4">
        <span className="font-semibold text-lg">
          ${(item.product.price * Number(item.quantity)).toFixed(2)}
        </span>
        <CartUpdateButton
          className="text-red-400 hover:text-red-300 mt-2"
          icon={<Trash2Icon className="h-4 w-4" />}
          onClick={handleRemoveFromCart}
        />
      </div>
    </div>
  );
};

export default CartCard;
