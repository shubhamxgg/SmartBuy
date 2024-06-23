"use client";
import Filter from "@/components/search/search-filter";
import SearchFilterDrawer from "@/components/search/search-drawer";
import SearchSortMenu from "@/components/search/search-sort-menu";
import useProductStore from "@/lib/store/use-products";
import { ArrowLeft } from "lucide-react";
import SearchProductList from "@/components/search/search-product-list";
import SearchSkeleton from "@/components/search/search-skeleton";
import { useFilters } from "@/hook/use-handle-filters";

const SearchPage = () => {
  const { filteredProducts, setSort, isLoading } = useProductStore();
  const { products, setPage, totalProducts, loading } = useFilters();
  const pageSize = 10;
  const totalPages = Math.ceil(totalProducts / pageSize);
  console.log(products, "Products");

  const handleSortChange = (criteria: string) => {
    setSort(criteria);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (loading) {
    <SearchSkeleton />;
  }

  if (isLoading) {
    return <SearchSkeleton />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex items-center justify-start p-4 md:p-6 font-bold mt-3 mb-2 lg:mt-5 lg:mb-2 text-lg md:text-xl">
        <span className="pl-8">{products.length} results found</span>
        <div className="absolute md:hidden">
          <ArrowLeft className="h-5 w-5" />
        </div>
      </div>

      <div className="hidden lg:block w-full p-4 mb-2">
        <SearchSortMenu onSortChange={handleSortChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 p-5">
        <div className="hidden md:block md:col-span-1">
          <Filter />
        </div>

        {products.length > 0 ? (
          <SearchProductList products={products} />
        ) : (
          "No Product"
        )}
      </div>

      <div className="flex justify-center mt-4 mb-5 w-full">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className="px-3 py-1 mx-1  bg-card rounded"
          >
            {index + 1}
          </button>
        ))}
      </div>

      <SearchFilterDrawer />
    </div>
  );
};

export default SearchPage;
