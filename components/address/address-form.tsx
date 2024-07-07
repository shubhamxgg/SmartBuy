"use client";

import React, { useEffect } from "react";
import { SubmitButton } from "./submit-button";
import { saveAddress } from "@/lib/actions/update-address";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface AddressFormProps {
  initialData: any;
  onClose: () => void;
}

interface FormState {
  success: boolean;
  message: string;
  errors?: {
    userId?: string[];
    street?: string[];
    city?: string[];
    state?: string[];
    zipCode?: string[];
    country?: string[];
  };
}

const AddressForm = ({ initialData, onClose }: AddressFormProps) => {
  const [state, formAction] = useFormState<FormState, FormData>(saveAddress, {
    success: false,
    message: "",
    errors: {},
  });

  useEffect(() => {
    if (state.success) {
      toast.success("Updated Address Successfully!!");
      onClose();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, onClose]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" defaultValue={initialData.id} />
      <input type="hidden" name="userId" defaultValue={initialData.userId} />

      <div className="mb-4">
        <label className="block mb-2">Street</label>
        <input
          name="street"
          defaultValue={initialData.street}
          className="w-full p-2 border rounded"
          required
        />
        {state.errors?.street && (
          <p className="text-red-500 text-sm mt-1">{state.errors.street}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">City</label>
        <input
          name="city"
          defaultValue={initialData.city}
          className="w-full p-2 border rounded"
          required
        />
        {state.errors?.city && (
          <p className="text-red-500 text-sm mt-1">{state.errors.city}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">State</label>
        <input
          name="state"
          defaultValue={initialData.state}
          className="w-full p-2 border rounded"
          required
        />
        {state.errors?.state && (
          <p className="text-red-500 text-sm mt-1">{state.errors.state}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Postal Code</label>
        <input
          name="zipCode"
          defaultValue={initialData.zipCode}
          className="w-full p-2 border rounded"
          required
        />
        {state.errors?.zipCode && (
          <p className="text-red-500 text-sm mt-1">{state.errors.zipCode}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Country</label>
        <input
          name="country"
          defaultValue={initialData.country}
          className="w-full p-2 border rounded"
          required
        />
        {state.errors?.country && (
          <p className="text-red-500 text-sm mt-1">{state.errors.country}</p>
        )}
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
};

export default AddressForm;
