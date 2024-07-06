"use client";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentInformation from "@/components/checkout/payment-information";
import PlaceOrderButton from "@/components/checkout/place-button";
import ReviewOrder from "@/components/checkout/review-order";
import ShippingInformation from "@/components/checkout/shipping-infotmation";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <OrderSummary />
          <ShippingInformation />
          <PaymentInformation />
        </div>
        <div>
          <ReviewOrder />
          <div className="mt-5">
            <PlaceOrderButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
