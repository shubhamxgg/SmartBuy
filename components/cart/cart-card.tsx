import React from "react";
import { CartItems } from "@/type";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import CartCardImage from "./cart-card-image";
import CartUpdateButton from "./cart-update-button";
import { useCart } from "@/hooks/use-cart";

interface CartItemProps {
  item: CartItems;
}

const CartCard = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCart();

  const { product, quantity } = item;
  const { id, title, imageUrl, price } = product;

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };
  const handleQuantityIncrease = () => {
    updateQuantity(id, quantity + 1);
  };
  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  if (!item || !item.product) {
    return null;
  }

  return (
    <div className="flex items-center py-4 border-b border-gray-700">
      <CartCardImage imageUrl={imageUrl} title={title} />
      <div className="flex-grow">
        <h4 className="font-semibold text-lg mb-1">{title}</h4>
        <div className="flex items-center mt-2">
          <CartUpdateButton
            icon={<MinusIcon className="h-4 w-4" />}
            onClick={handleQuantityDecrease}
            disabled={quantity <= 1}
          />
          <span className="mx-3 font-semibold">{quantity}</span>
          <CartUpdateButton
            icon={<PlusIcon className="h-4 w-4" />}
            onClick={handleQuantityIncrease}
          />
        </div>
      </div>
      <div className="flex flex-col items-end ml-4">
        <span className="font-semibold text-lg">
          ${(price * Number(quantity)).toFixed(2)}
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
