import React, { useState, useCallback, useMemo, useOptimistic } from "react";
import { useAddressStore } from "@/store/useAddressStore";
import { Address } from "@/type";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import AddressForm from "./address-form";
import { useAddresses } from "@/hooks/use-address";
import { toast } from "sonner";

interface AddressListProps {
  userId: number;
  onSelectAddress: (address: Address) => void;
}

const AddressList = React.memo(
  ({ userId, onSelectAddress }: AddressListProps) => {
    const {
      data,
      isLoading,
      error,
      invalidateAddresses,
      deleteAddress,
      isDeletingAddress,
    } = useAddresses(userId!);
    const { selectAddress } = useAddressStore();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<any | null>(null);
    const [addressToDelete, setAddressToDelete] = useState<number | null>(null);

    const handleEditClick = useCallback((address: Address) => {
      setCurrentAddress(address);
      setIsDialogOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
      setIsDialogOpen(false);
      invalidateAddresses();
    }, [invalidateAddresses]);

    const handleSelectAddress = useCallback(
      (address: Address) => {
        selectAddress(address);
        onSelectAddress(address);
      },
      [selectAddress, onSelectAddress]
    );

    const handleDeleteClick = useCallback((addressId: number) => {
      setAddressToDelete(addressId);
      setIsDeleteDialogOpen(true);
    }, []);

    const confirmDelete = useCallback(() => {
      if (addressToDelete) {
        deleteAddress(addressToDelete);
        setIsDeleteDialogOpen(false);
        setAddressToDelete(null);
        toast.success("Address deleted successfully");
      }
    }, [addressToDelete, deleteAddress]);

    const addressList = useMemo(() => {
      return data.map((address: Address) => (
        <div key={address.id} className="border p-4 mb-4 rounded-sm">
          <div className="flex items-center">
            <input
              type="radio"
              name="selectedAddress"
              onClick={() => handleSelectAddress(address)}
            />
            <label className="ml-5">
              {address.street}, {address.city}, {address.zipCode},{" "}
              {address.country}
            </label>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto mr-2"
              onClick={() => handleEditClick(address)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteClick(address.id)}
              disabled={isDeletingAddress}
            >
              Delete
            </Button>
          </div>
        </div>
      ));
    }, [
      data,
      handleSelectAddress,
      handleEditClick,
      handleDeleteClick,
      isDeletingAddress,
    ]);

    const handleNewAddress = useCallback(() => {
      setCurrentAddress({
        id: 0,
        userId: userId,
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
      setIsDialogOpen(true);
    }, [userId]);

    if (isLoading) return <p>Loading addresses...</p>;
    if (error) return <p>Error loading addresses. Please try again later.</p>;

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2>Your Shipping Addresses</h2>
          <Button onClick={handleNewAddress}>Add New Address</Button>
        </div>
        {addressList}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentAddress?.id ? "Edit Address" : "Add New Address"}
              </DialogTitle>
              <DialogDescription>
                {currentAddress?.id
                  ? "Make changes to your address here."
                  : "Enter your new address details."}
              </DialogDescription>
            </DialogHeader>
            <AddressForm
              initialData={currentAddress}
              onClose={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this address? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={isDeletingAddress}
              >
                {isDeletingAddress ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);

AddressList.displayName = "AddressList";

export default AddressList;
