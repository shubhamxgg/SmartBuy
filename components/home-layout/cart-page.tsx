"use client";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet";
import CartSummary from "../cart/cart-summary";
import { useState, useEffect } from "react";
import CartItem from "../cart/cart-item";
import useCartStore from "@/store/useCartStore";
import { useUserAuth } from "@/hooks/use-user-auth";
import { CartItems } from "@/type";

const CartPage = () => {
  const { cart, fetchCart, mergeLocalCartWithServerCart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const { userId } = useUserAuth();

  useEffect(() => {
    const initializeCart = async () => {
      if (userId) {
        await fetchCart(userId);
      } else {
        await fetchCart(null);
      }
    };

    initializeCart();
  }, [userId, fetchCart, mergeLocalCartWithServerCart]);

  const cartItems = cart?.items || [];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative p-2">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Cart</h2>
        </div>
        {!cartItems || cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold mb-2">Your cart is empty</p>
            <p className="text-muted-foreground">
              Add some items to get started!
            </p>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto mb-6">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item as CartItems} />
              ))}
            </div>
            <div className="mt-auto">
              <CartSummary onClose={() => setIsOpen(false)} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartPage;
