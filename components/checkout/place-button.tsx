"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddressStore } from "@/store/useAddressStore";
import { usePaymentStore } from "@/store/usePaymentStore";
import useProductStore from "@/store/useProductStore";
import { toast } from "sonner";
import { createOrder } from "@/lib/actions/order";
import { motion, AnimatePresence } from "framer-motion";

const PlaceOrderButton = () => {
  const router = useRouter();
  const userId = 1;
  const session = true;
  const { cart, cartId, clearCart } = useProductStore();
  const { selectedAddress } = useAddressStore();
  const { paymentMethod } = usePaymentStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!session) {
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
      items: cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount,
      status: "PENDING",
      paymentStatus: "PENDING",
      shippingStatus: "PENDING",
      shippingAddress: selectedAddress,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const result = await createOrder(order);
      if (result.success) {
        setOrderPlaced(true);
        toast.success("Order placed successfully!");
        clearCart(cartId);
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
      <motion.button
        onClick={handlePlaceOrder}
        className={`w-full py-2 px-4 rounded ${
          isProcessing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        disabled={isProcessing}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {isProcessing ? (
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-5 h-5 border-t-2 border-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="ml-2">Processing...</span>
          </motion.div>
        ) : (
          "Place Order"
        )}
      </motion.button>
    </AnimatePresence>
  );
};

export default PlaceOrderButton;
