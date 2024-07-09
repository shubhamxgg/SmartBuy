"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const OrderSummary = dynamic(
  () => import("@/components/checkout/order-summary"),
  {
    loading: () => <p>Loading order summary...</p>,
    ssr: false,
  }
);

const ShippingInformation = dynamic(
  () => import("@/components/checkout/shipping-infotmation"),
  {
    loading: () => <p>Loading shipping information...</p>,
    ssr: false,
  }
);

const PaymentInformation = dynamic(
  () => import("@/components/checkout/payment-information"),
  {
    loading: () => <p>Loading payment information...</p>,
    ssr: false,
  }
);

const ReviewOrder = dynamic(
  () => import("@/components/checkout/review-order"),
  {
    loading: () => <p>Loading order review...</p>,
    ssr: false,
  }
);

const PlaceOrderButton = dynamic(
  () => import("@/components/checkout/place-button"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const CheckoutPage = () => {
  return (
    <div className="p-1">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Suspense fallback={<p>Loading order summary...</p>}>
            <OrderSummary />
          </Suspense>
          <Suspense fallback={<p>Loading shipping information...</p>}>
            <ShippingInformation />
          </Suspense>
          <Suspense fallback={<p>Loading payment information...</p>}>
            <PaymentInformation />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<p>Loading order review...</p>}>
            <ReviewOrder />
          </Suspense>
          <div className="mt-5">
            <Suspense fallback={<p>Loading...</p>}>
              <PlaceOrderButton />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
