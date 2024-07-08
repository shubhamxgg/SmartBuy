"use client";
import React from "react";
import useProductStore from "@/store/useProductStore";
import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";

const CartPage = () => {
  const { cart } = useProductStore();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="md:w-1/3">
            {/* <CartSummary /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
