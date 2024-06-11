// components/CartSummary.tsx
import React from "react";
import useProductStore from "@/lib/store/use-products";

const CartSummary: React.FC = () => {
  const { cart, clearCart } = useProductStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold">Cart Summary</h2>
      <div className="mt-2 flex justify-between">
        <span>Total</span>
        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>
      <div className="mt-4">
        <button className="w-full py-2 bg-blue-500 text-white rounded">
          Proceed to Checkout
        </button>
        <button
          className="w-full mt-2 py-2 bg-gray-200 text-gray-700 rounded"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
