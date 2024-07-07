import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddressList from "../address/address-list";
import { useAddressStore } from "@/store/useAddressStore";
import { Address } from "@/lib/type";

const ShippingInformation = () => {
  const { selectAddress } = useAddressStore();
  
  const handleSelectAddress = (address: Address) => {
    selectAddress(address);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <AddressList userId={1} onSelectAddress={handleSelectAddress} />
      </CardContent>
    </Card>
  );
};

export default ShippingInformation;
