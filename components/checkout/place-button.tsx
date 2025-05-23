"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAddressStore } from "@/store/useAddressStore";
import { usePaymentStore } from "@/store/usePaymentStore";
import useCartStore from "@/store/useCartStore";
import { toast } from "sonner";

import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../ui/animate-button";
import { useUserAuth } from "@/hooks/use-auth";
import { createOrder } from "@/lib/actions/create-order";

const PlaceOrderButton = () => {
  const router = useRouter();
  const { userId, isAuthenticated } = useUserAuth();
  const { cart, clearCart } = useCartStore();
  const { selectedAddress } = useAddressStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const total = useMemo(
    () =>
      cart.items.reduce(
        (acc: number, item: { product: { price: number }; quantity: number }) =>
          acc + item.product.price * item.quantity,
        0
      ),
    [cart.items]
  );

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to place an order");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }

    setIsProcessing(true);
    const order = {
      userId: userId,
      items: cart.items.map((item) => ({
        title: item.product.title,
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: total,
      status: "PENDING",
      paymentStatus: "PENDING",
      shippingStatus: "PENDING",
      shippingAddress: selectedAddress,
    };

    try {
      const result = await createOrder(order);
      if (result.success) {
        setOrderPlaced(true);
        toast.success("Order placed successfully!");
        await clearCart();
        router.push(`/orders/${result.orderId}`);
      } else {
        toast.error(result.error || "Failed to place order");
        setIsProcessing(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <AnimatedButton
        onClick={handlePlaceOrder}
        className={`w-full transition-colors duration-300 rounded-sm p-2 text-black ${
          isProcessing
            ? "bg-gray-600 hover:bg-gray-700 cursor-not-allowed"
            : "bg-primary hover:bg-primary-dark"
        }`}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg
              className="w-6 h-6 text-white animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="ml-2">Processing...</span>
          </motion.div>
        ) : (
          "Place Order"
        )}
      </AnimatedButton>
    </AnimatePresence>
  );
};

export default PlaceOrderButton;
