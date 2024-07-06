import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentInformation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="mb-4">
            <label className="block mb-2">Card Number</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Expiration Date</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="MM/YY" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">CVV</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Cardholder Name</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentInformation;