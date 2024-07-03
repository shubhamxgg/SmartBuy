"use client";
import { ArrowLeft } from "lucide-react";
import SearchSidebar from "@/components/search/search-sidebar";
import SearchProductListSkeleton from "@/components/search/search-sidebar-skeleton";
import SearchProductList from "@/components/search/search-product-list";
import SearchSortMenu from "@/components/search/search-sort-menu";
import { useFilterStore } from "@/store/useFilterStore";
import useSyncURLWithState from "@/hooks/use-filtered-url";
import useProducts from "@/hooks/use-products";
import SearchFilterDrawer from "@/components/search/search-drawer";

const Search = () => {
  useSyncURLWithState();
  const { priceRange, selectedBrands, selectedCategories, selectedRating } =
    useFilterStore();

  const filters = {
    priceRange,
    selectedBrands,
    categoryNames: selectedCategories,
    selectedRating,
  };

  const { data: products, error } = useProducts(filters);
  const isLoading = false;

  //   if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex items-center justify-start p-4 md:p-6 font-bold mt-3 mb-2 lg:mt-5 lg:mb-2 text-lg md:text-xl">
        <span className="pl-8">{products?.length} results found</span>
        <div className="absolute md:hidden">
          <ArrowLeft className="h-5 w-5" />
        </div>
      </div>

      <div className="hidden lg:block w-full p-4 mb-2">
        <SearchSortMenu />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 p-5">
        <div className="hidden md:block md:col-span-1">
          <SearchSidebar />
        </div>

        {isLoading ? (
          <SearchProductListSkeleton />
        ) : error ? (
          <div className="col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
            Error loading products: {error.message}
          </div>
        ) : (
          <SearchProductList products={products || []} />
        )}
      </div>

      <SearchFilterDrawer />
    </div>
  );
};

export default Search;
