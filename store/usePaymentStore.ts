import { create } from "zustand";

interface PaymentStore {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  paymentMethod: "COD",
  setPaymentMethod: (method) => set({ paymentMethod: method }),
}));
