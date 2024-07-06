import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddressList from "../address/address-list";

const ShippingInformation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <AddressList userId={1} onSelectAddress={() => {}} />
      </CardContent>
    </Card>
  );
};

export default ShippingInformation;
