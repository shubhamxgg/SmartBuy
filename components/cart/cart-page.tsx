"use client";

import { useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import useCartStore from "@/store/useCartStore";
import { useUserAuth } from "@/hooks/use-auth";
import CartList from "./cart-list";
import useCartSheet from "@/hooks/use-cart-sheet";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import CartSummary from "./cart-summary";

const CartPage = () => {
  const { cartData, cart, setCart, mergeCart } = useCart();
  const { isOpen, setIsOpen } = useCartSheet();
  const { userId } = useUserAuth();

  useEffect(() => {
    if (cartData.isSuccess && userId) {
      mergeCart();
    }
  }, [cartData.isSuccess, cartData.data, setCart, userId]);

  const cartItemCount = cart?.items?.length ?? 0;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative p-2">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <CartList
          cartItems={cart?.items ?? []}
          onClose={() => setIsOpen(false)}
          isLoading={cartData.isLoading}
          error={cartData.error?.message ?? ""}
        />

        <div className="mt-auto">
          <CartSummary onClose={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartPage;
