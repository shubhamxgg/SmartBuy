"use client";

import React from "react";
import { useFormState } from "react-dom";
import { Address } from "@/lib/type";
import { SubmitButton } from "./submit-button";
import { updateAddress } from "@/lib/actions/update-address";

interface AddressFormProps {
  initialData: Address;
  onSubmit: (data: Address) => void;
  onCancel: () => void;
}

const initialState: Address = {
  id: 0,
  street: "",
  city: "",
  zipCode: "",
  country: "",
  userId: 0,
  state: "",
};

const AddressForm = ({ initialData, onSubmit, onCancel }: AddressFormProps) => {
  const [state, formAction] = useFormState(updateAddress, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" defaultValue={initialData?.id} />
      <input type="hidden" name="userId" defaultValue={initialData?.userId} />
      <div className="mb-4">
        <label className="block mb-2">Street</label>
        <input
          name="street"
          defaultValue={initialData?.street}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">City</label>
        <input
          name="city"
          defaultValue={initialData?.city}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">City</label>
        <input
          name="city"
          defaultValue={initialData?.state}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Postal Code</label>
        <input
          name="zipCode"
          defaultValue={initialData?.zipCode}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Country</label>
        <input
          name="country"
          defaultValue={initialData?.country}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  );
};

export default AddressForm;
