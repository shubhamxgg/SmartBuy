"use client";

import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg">
      <h2 className="text-xl font-semibold text-red-800 mb-2">
        Something went wrong!
      </h2>
      <p className="text-red-600 mb-4">{error.message}</p>
      <Button onClick={reset} variant="outline" className="bg-white">
        Try again
      </Button>
    </div>
  );
}
