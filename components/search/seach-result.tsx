import SearchProductListSkeleton from "./search-sidebar-skeleton";
import SearchProductList from "./search-product-list";
import { Product } from "@/type";

interface SearchResultsProps {
  products?: Product[];
  isLoading: boolean;
  error: Error | null;
}

const SearchResults = ({ products, isLoading, error }: SearchResultsProps) => {
  if (isLoading) {
    return <SearchProductListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-red-500 flex items-center justify-center w-full h-full">
        <p> Error loading products: {error.message}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center md:text-xl">
        No products found. Try adjusting your filters.
      </div>
    );
  }

  return <SearchProductList products={products} />;
};

export default SearchResults;
