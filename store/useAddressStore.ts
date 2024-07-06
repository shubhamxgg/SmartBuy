import { getUserAddresses } from "@/lib/actions/address";
import { Address } from "@/lib/type";
import { create } from "zustand";

interface AddressStore {
  addresses: Address[];
  selectedAddress: Address | null;
  isLoading: boolean;
  error: string | null;
  fetchAddresses: (userId: number) => void;
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (addressId: number) => void;
  selectAddress: (address: Address) => void;
}

export const useAddressStore = create<AddressStore>((set) => ({
  addresses: [],
  selectedAddress: null,
  isLoading: false,
  error: null,
  fetchAddresses: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getUserAddresses({ userId });
      set({ addresses: data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch addresses ", isLoading: false });
    }
  },
  addAddress: async (address: Address) => {
    set((state) => ({ addresses: [...state.addresses, address] }));
  },
  updateAddress: async (address: Address) => {
    set((state) => ({
      addresses: state.addresses.map((addr) =>
        addr.id === address.id ? address : addr
      ),
    }));
  },
  deleteAddress: async (addressId: number) => {
    set((state) => ({
      addresses: state.addresses.filter((addr) => addr.id !== addressId),
    }));
  },
  selectAddress: (address: Address) => set({ selectedAddress: address }),
}));
