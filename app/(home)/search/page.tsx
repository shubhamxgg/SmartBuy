"use client";
import SearchSidebar from "@/components/search/search-sidebar";
import SearchSortMenu from "@/components/search/search-sort-menu";
import { useFilterStore } from "@/store/useFilterStore";
import useSyncURLWithState from "@/hooks/use-filtered-url";
import useProducts from "@/hooks/use-products";
import SearchFilterDrawer from "@/components/search/search-drawer";
import { useRouter } from "next/navigation";
import SearchHeader from "@/components/search/search-header";
import SearchResults from "@/components/search/seach-result";

const Search = () => {
  const router = useRouter();
  useSyncURLWithState();
  const {
    priceRange,
    selectedBrands,
    selectedCategories,
    selectedRating,
    sort,
  } = useFilterStore();

  const filters = {
    priceRange,
    selectedBrands,
    categoryNames: selectedCategories,
    selectedRating,
    sort,
  };

  const { data: products, error } = useProducts(filters);
  const isLoading = false;
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SearchHeader resultCount={products?.length || 0} onBack={handleBack} />

      <div className="hidden lg:block w-full p-4 mb-2">
        <SearchSortMenu />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 p-5">
        <div className="hidden md:block md:col-span-1">
          <SearchSidebar />
        </div>

        <SearchResults
          isLoading={isLoading}
          error={error}
          products={products}
        />
      </div>

      <SearchFilterDrawer />
    </div>
  );
};

export default Search;
