import CartSummary from "./cart-summary";
import { CartItems } from "@/type";
import CartEmpty from "./cart-empty";
import CartCard from "./cart-card";

interface CartContentProps {
  cartItems: CartItems[];
  onClose: () => void;
  isLoading: boolean;
  error: string | null;
}

const CartList = ({
  cartItems,
  onClose,
  isLoading,
  error,
}: CartContentProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Cart</h2>
      </div>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <div className="flex-grow overflow-y-auto mb-6">
            {cartItems.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-auto">
            <CartSummary onClose={onClose} />
          </div>
        </>
      )}
    </>
  );
};

export default CartList;
