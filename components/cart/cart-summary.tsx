import useCartStore from "@/store/useCartStore";
import useAuthModalStore from "@/store/useAuthModalStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Button } from "../ui/button";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { toast } from "sonner";


interface CartSummaryProps {
  onClose: () => void;
}

const CartSummary = ({ onClose }: CartSummaryProps) => {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const { openModal } = useAuthModalStore();
  const { user } = useAuthStore();

  const total = useMemo(
    () =>
      cart.items.reduce(
        (acc: number, item: { product: { price: number }; quantity: number }) =>
          acc + item.product.price * item.quantity,
        0
      ),
    [cart.items]
  );

  const handleCheckout = useCallback(async () => {
    if (!user) {
      openModal();
      return;
    }
    try {
      await router.push("/checkout");
      onClose();
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  }, [onClose, router, user, openModal]);

  const handleClearCart = useCallback(() => {
    clearCart();
    toast.message("Cart cleared");
    onClose();
  }, [clearCart, onClose]);

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Cart Summary
        </h3>
       <Button variant="outline" size="sm" onClick={handleClearCart} className="text-sm">
         Clear Cart <ShoppingCart className="ml-2 h-4 w-4" />
       </Button>
      </div>
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-700">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-2xl font-bold">${total.toFixed(2)}</span>
      </div>
      <Button
        className="w-full py-6 text-lg font-semibold"
        onClick={handleCheckout}
        disabled={cart.items.length === 0}
      >
        {user ? "Proceed to Checkout" : "Sign In to Checkout"}
      </Button>
    </div>
  );
};

export default CartSummary;
