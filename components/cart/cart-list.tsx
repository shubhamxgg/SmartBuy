import CartSummary from "./cart-summary";
import { CartItems } from "@/type";
import CartEmpty from "./cart-empty";
import CartCard from "./cart-card";

interface CartContentProps {
  cartItems: CartItems[];
}

const CartList = ({ cartItems }: CartContentProps) => {
  return (
    <div className="flex-grow mb-6 overflow-y-scroll">
      {cartItems.map((item) => (
        <CartCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;
