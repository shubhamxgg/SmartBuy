import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReviewOrder = () => {
  const items = [
    { id: 1, name: "Product 1", quantity: 2, price: 20 },
    { id: 2, name: "Product 2", quantity: 1, price: 15 },
  ];
  const shippingAddress = "1234 Main St, Anytown, USA";
  const paymentMethod = "Credit Card";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Items</h3>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p>{shippingAddress}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <p>{paymentMethod}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewOrder;