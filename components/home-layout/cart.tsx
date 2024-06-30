"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import useProductStore from "@/store/useProducts";
import CartItem from "../cart/cart-item";
import CartSummary from "../cart/cart-summary";

const CartSheet = () => {
  const { cart } = useProductStore();
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
          <div className="flex flex-col">
            <div className="max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
