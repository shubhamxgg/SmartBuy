import useProductStore from "@/store/useProductStore";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

const CartSummary = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { cart, cartId, clearCart } = useProductStore();
  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleChange = useCallback(() => {
    router.push("/checkout");
    onClose();
  }, [onClose, router]);

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Cart Summary</h3>
        <Button variant={"outline"} onClick={() => clearCart(cartId)}>
          Clear Cart
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-500 font-medium">Total</span>
        <span className="text-gray-500 font-bold text-2xl">
          ${total.toFixed(2)}
        </span>
      </div>
      <Button className="w-full mt-4" onClick={handleChange}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
