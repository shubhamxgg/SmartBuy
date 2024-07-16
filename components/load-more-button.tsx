import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

export function LoadMoreButton({
  onClick,
  disabled,
  isLoading,
  children,
}: LoadMoreButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}
