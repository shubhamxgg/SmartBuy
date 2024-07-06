"use client";
import React, { useEffect, useState } from "react";
import { useAddressStore } from "@/store/useAddressStore";
import { Address } from "@/lib/type";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddressForm from "./address-form";

interface AddressListProps {
  userId: number;
  onSelectAddress: (address: Address) => void;
}

const AddressList = ({ userId, onSelectAddress }: AddressListProps) => {
  const {
    addresses,
    isLoading,
    error,
    fetchAddresses,
    selectAddress,
    updateAddress,
  } = useAddressStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  const handleUpdateAddress = async (updatedAddress: Address) => {
    await updateAddress(updatedAddress);
    setIsDialogOpen(false);
    setCurrentAddress(null);
  };

  useEffect(() => {
    fetchAddresses(userId);
  }, [userId, fetchAddresses]);
  const handleEditClick = (address: Address) => {
    setCurrentAddress(address);
    setIsDialogOpen(true);
  };
  console.log(currentAddress, "Current");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="pb-2">Your Shipping Address</h2>
      {addresses.map((address) => (
        <div key={address.id} className="border p-4 mb-4 rounded-sm">
          <div className="flex items-center">
            <input
              type="radio"
              name="selectedAddress"
              onClick={() => {
                selectAddress(address);
                onSelectAddress(address);
              }}
            />
            <label className="ml-5">
              {address.street}, {address.city},{address.zipCode},{" "}
              {address.country}
            </label>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild className="ml-auto">
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => handleEditClick(address)}
                >
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when done.
                  </DialogDescription>
                </DialogHeader>
                <AddressForm
                  initialData={currentAddress!!}
                  onSubmit={handleUpdateAddress}
                  onCancel={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
