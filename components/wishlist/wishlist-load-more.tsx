import { LoadMoreButton } from "../load-more-button";

interface LoadMoreProps {
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
  }
  
  export default function LoadMoreWishlist({ 
    hasNextPage, 
    isFetchingNextPage, 
    fetchNextPage 
  }: LoadMoreProps) {
    if (!hasNextPage) return null;
  
    return (
      <div className="flex justify-center mt-4">
        <LoadMoreButton
          onClick={fetchNextPage}
          disabled={isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          Load More
        </LoadMoreButton>
      </div>
    );
  }