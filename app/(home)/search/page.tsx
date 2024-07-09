"use client";

import { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useFilterStore } from "@/store/useFilterStore";
import useSyncURLWithState from "@/hooks/use-filtered-url";
import useProducts from "@/hooks/use-products";

import SearchHeader from "@/components/search/search-header";
const SearchSidebar = dynamic(
  () => import("@/components/search/search-sidebar"),
  { ssr: false }
);
const SearchSortMenu = dynamic(
  () => import("@/components/search/search-sort-menu"),
  { ssr: false }
);
const SearchFilterDrawer = dynamic(
  () => import("@/components/search/search-drawer"),
  { ssr: false }
);
const SearchResults = lazy(() => import("@/components/search/seach-result"));

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
        <Suspense fallback={<div>Loading sort menu...</div>}>
          <SearchSortMenu />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 p-5">
        <div className="hidden md:block md:col-span-1">
          <Suspense fallback={<div>Loading sidebar...</div>}>
            <SearchSidebar />
          </Suspense>
        </div>

        <Suspense fallback={<div>Loading search results...</div>}>
          <SearchResults
            isLoading={isLoading}
            error={error}
            products={products}
          />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading filter drawer...</div>}>
        <SearchFilterDrawer />
      </Suspense>
    </div>
  );
};

export default Search;
