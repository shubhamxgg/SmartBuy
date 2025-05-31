import { cn } from "@/lib/utils";

export const RetryButton = ({
  onClick,
  error,
  loading,
  className,
}: {
  onClick: () => void;
  error?: string;
  loading?: boolean;
  className?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh w-full space-y-4">
      {error ? (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      ) : (
        <p className="font-bold text-sm">Something went wrong! </p>
      )}
      <button
        onClick={onClick}
        className={cn(
          "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200",
          loading && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center space-x-2">
            <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>
            <span>Loading...</span>
          </span>
        ) : (
          "Retry"
        )}
      </button>
    </div>
  );
};
