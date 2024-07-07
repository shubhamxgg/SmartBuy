"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAddressStore } from "@/store/useAddressStore";
import { usePaymentStore } from "@/store/usePaymentStore";
import useProductStore from "@/store/useProductStore";

const ReviewOrder = () => {
  const { cart } = useProductStore();
  const { selectedAddress } = useAddressStore();
  const { paymentMethod } = usePaymentStore();
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Items</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.product.title} (x{item.quantity})
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold mt-2">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          {selectedAddress ? (
            <p>
              {selectedAddress.street}, {selectedAddress.city},{" "}
              {selectedAddress.state} {selectedAddress.zipCode}
            </p>
          ) : (
            <p>No address selected</p>
          )}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <p>{paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewOrder;
