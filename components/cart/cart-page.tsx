"use client";

import { useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
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
  }, [cartData.isSuccess, mergeCart, userId]);

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
        {cartData.error ? (
          <div className="flex flex-col items-center justify-center h-[450px]">
            <p className="text-red-500 text-sm mb-4">
              {cartData.error.message || "Failed to load cart items."}
            </p>
            <Button
              variant="outline"
              onClick={() => cartData.refetch()}
              className="px-4 py-2"
            >
              Retry
            </Button>
          </div>
        ) : cart.items.length > 0 ? (
          <CartList cartItems={cart?.items ?? []} />
        ) : (
          <p className="text-center text-gray-500 pb-10">Your cart is empty.</p>
        )}

        <div className="mt-auto">
          <CartSummary onClose={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartPage;
