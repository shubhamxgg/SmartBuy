import dynamic from "next/dynamic";
import { Suspense } from "react";
import { getCategories } from "@/lib/actions/category";
import { getSellers } from "@/lib/actions/seller";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterSidebarSkeleton, ProductListSkeleton } from "./search-skeletons";

const MobileFilters = dynamic(
  () => import("@/components/filtering/filter-drawer"),
  { ssr: false }
);

const ProductList = dynamic(
  () => import("@/components/filtering/product-list"),
  {
    ssr: false,
  }
);

const FilterSidebar = dynamic(
  () => import("@/components/filtering/filter-sidebar"),
  {
    ssr: false,
  }
);

const SortDropdown = dynamic(
  () => import("@/components/filtering/sort-dropdown"),
  {
    ssr: false,
  }
)

function SortDropdownSkeleton() {
  return (
    <div className="flex justify-end">
      <Skeleton className="h-10 w-40" />
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const [categories, sellers] = await Promise.all([
    getCategories(),
    getSellers(),
  ]);

  return (
    <div className="space-y-4 pb-20 md:pb-0">
      <h1 className="text-3xl font-bold mb-8">Search Products</h1>
      <div className="flex items-center justify-end mb-4">
        <div className="hidden md:block">
          <Suspense fallback={<SortDropdownSkeleton />}>
            <SortDropdown />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block w-fit lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-8rem)] overflow-y-auto ">
          <Suspense fallback={<FilterSidebarSkeleton />}>
            <FilterSidebar categories={categories} sellers={sellers} />
          </Suspense>
        </div>
        <div className="flex-1 md:ml-8">
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <MobileFilters categories={categories} sellers={sellers} />
      </Suspense>
    </div>
  );
}
