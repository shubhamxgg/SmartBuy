"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useUserAuth } from "@/hooks/use-auth";
import useAuthModalStore from "@/store/useAuthModalStore";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";

const OrderSummary = dynamic(() => import("@/components/checkout/order-summary"), { ssr: false });
const ShippingInformation = dynamic(() => import("@/components/checkout/shipping-infotmation"), { ssr: false });
const PaymentInformation = dynamic(() => import("@/components/checkout/payment-information"), { ssr: false });
const ReviewOrder = dynamic(() => import("@/components/checkout/review-order"), { ssr: false });
const PlaceOrderButton = dynamic(() => import("@/components/checkout/place-button"), { ssr: false });

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const CheckoutPage = () => {
  const { isAuthenticated,} = useUserAuth();
  const { openModal } = useAuthModalStore();

  useEffect(() => {
    if (!isAuthenticated) {
      openModal();
    }
  }, [isAuthenticated, openModal]);

 

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
        <p className="mb-4">Please log in to access the checkout page.</p>
        <Button onClick={openModal}>Log In</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<LoadingSpinner />}>
            <OrderSummary />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <ShippingInformation />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <PaymentInformation />
          </Suspense>
        </div>
        <div className="space-y-6">
          <Suspense fallback={<LoadingSpinner />}>
            <ReviewOrder />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <PlaceOrderButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;