"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import useCartStore from "@/store/useCartStore";
import { useUserAuth } from "@/hooks/use-auth";
import CartButton from "./cart-button";
import CartList from "./cart-list";
import useCartSheet from "@/hooks/use-cart-sheet";

const CartPage = () => {
  const { cart, fetchCart, isLoading, error } = useCartStore();
  const { isOpen, setIsOpen } = useCartSheet();
  const { userId } = useUserAuth();

  useEffect(() => {
    fetchCart(userId ?? null);
  }, [userId, fetchCart]);

  const cartItemCount = cart?.items?.length ?? 0;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <CartButton itemCount={cartItemCount} />
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <CartList
          cartItems={cart?.items ?? []}
          onClose={() => {}}
          isLoading={isLoading}
          error={error}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CartPage;
