import useProductStore from "@/store/useProductStore";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const CartSummary = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  const { cart, cartId, clearCart } = useProductStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const handleChange = useCallback(() => {
    router.push("/checkout");
    onClose();
  }, [onClose, router]);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold">Cart Summary</h2>
      <div className="mt-2 flex justify-between">
        <span>Total</span>
        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>
      <div className="mt-4">
        <button
          className="w-full py-2 bg-blue-500 text-white rounded"
          onClick={handleChange}
        >
          Proceed to Checkout
        </button>
        <button
          className="w-full mt-2 py-2 bg-gray-200 text-gray-700 rounded"
          onClick={() => clearCart(cartId)}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
