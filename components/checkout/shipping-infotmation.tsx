import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddressList from "../address/address-list";
import { useAddressStore } from "@/store/useAddressStore";
import { Address } from "@/type";
import { useUserId } from "@/hooks/use-user-id";

const ShippingInformation = () => {
  const { selectAddress } = useAddressStore();
  const userId = useUserId();
  if(!userId) return <div>Login</div>
  const handleSelectAddress = (address: Address) => {
    selectAddress(address);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <AddressList userId={userId} onSelectAddress={handleSelectAddress} />
      </CardContent>
    </Card>
  );
};

export default ShippingInformation;
