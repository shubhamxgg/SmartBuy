"use client";

import React from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { usePaymentStore } from "@/store/usePaymentStore";

const PaymentInformation = () => {
  const { paymentMethod, setPaymentMethod } = usePaymentStore();

  return (
    <div className="bg-card p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="COD" id="COD" />
          <Label htmlFor="COD">Cash on Delivery</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentInformation;


