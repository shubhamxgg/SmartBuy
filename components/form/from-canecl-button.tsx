"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CancelButtonProps {
  onCancel?: () => void;
}

export function CancelButton({ onCancel }: CancelButtonProps) {
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <Button type="button" variant="outline" onClick={handleCancel}>
      Cancel
    </Button>
  );
}
