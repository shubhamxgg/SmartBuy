import SearchProductListSkeleton from "./search-sidebar-skeleton";
import SearchProductList from "./search-product-list";
import { Product } from "@/lib/type";

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
      <div className="text-red-500">
        Error loading products: {error.message}
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
