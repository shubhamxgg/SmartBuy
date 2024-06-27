"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const FormSumbitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      Add
    </Button>
  );
};

export default FormSumbitButton;
