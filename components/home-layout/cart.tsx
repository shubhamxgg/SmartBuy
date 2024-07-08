"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import CartSummary from "../cart/cart-summary";
import { useEffect, useState } from "react";
import CartItem from "../cart/cart-item";
import useProductStore from "@/store/useProductStore";

const CartPage = () => {
  const { cart, fetchCart } = useProductStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (!cart) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="bg-gray-900 hover:bg-gray-800 text-white rounded-full relative"
        >
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute -top-3 -right-1 bg-primary text-white text-xs font-bold px-2 rounded-full py-1">
              {cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-card shadow-lg rounded-t-2xl  h-full text-white py-10">
        <div className="px-6 py-4 border-b border-gray-800">
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        </div>
        {cart.length === 0 ? (
          <div className="p-6 text-gray-400">Your cart is empty.</div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-grow">
              {cart?.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="border-t border-gray-800 mb-10">
              <CartSummary onClose={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartPage;
