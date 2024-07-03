"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import CartSummary from "../cart/cart-summary";
import { useEffect } from "react";
import CartItem from "../cart/cart-item";
import cartStore from "@/store/cartStore";
import useProductStore from "@/store/useProducts";

const CartSheet = () => {
  const { cart, fetchCart } = useProductStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (!cart) {
    return null;
  }

  console.log(cart);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex flex-col h-full py-5">
            <div className="flex-grow flex-col-reverse overflow-auto">
              {cart?.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-5">
              <CartSummary />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
