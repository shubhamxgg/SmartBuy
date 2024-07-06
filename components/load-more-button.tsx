import React from "react";
import { Button } from "@/components/ui/button";

interface LoadMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  hasNextPage: boolean | undefined;
}

const LoadMoreButton = ({
  onClick,
  disabled,
  isLoading,
  hasNextPage,
}: LoadMoreButtonProps) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    className="mt-4 w-full"
    variant="outline"
  >
    {isLoading
      ? "Loading more..."
      : hasNextPage
      ? "Load More"
      : "Nothing more to load"}
  </Button>
);

export default LoadMoreButton;
