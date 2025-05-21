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
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white py-2 px-4 rounded ${className}`}
      disabled={loading}
    >
      {loading ? "Loading..." : "Retry"}
    </button>
  );
};
