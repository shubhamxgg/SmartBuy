import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const PlaceOrderButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Place order logic here
    setTimeout(() => {
      setIsLoading(false);
      alert("Order placed successfully!");
    }, 2000);
  };

  return (
    <Button onClick={handlePlaceOrder} className="w-full" disabled={isLoading}>
      {isLoading ? "Placing Order..." : "Place Order"}
    </Button>
  );
};

export default PlaceOrderButton;
