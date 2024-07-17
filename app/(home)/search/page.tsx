import { Suspense } from "react";
import { getCategories } from "@/lib/actions/category";
import { getSellers } from "@/lib/actions/seller";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import MobileFilters from "@/components/filtering/filter-drawer";

const ProductList = dynamic(
  () => import("@/components/filtering/product-list"),
  {
    ssr: false,
    loading: () => <ProductListSkeleton />,
  }
);

const FilterSidebar = dynamic(
  () => import("@/components/filtering/filter-sidebar"),
  {
    ssr: false,
    loading: () => <FilterSidebarSkeleton />,
  }
);

const SortDropdown = dynamic(
  () => import("@/components/filtering/sort-dropdown"),
  {
    ssr: false,
    loading: () => <SortDropdownSkeleton />,
  }
);

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

function FilterSidebarSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-3/4" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-6 w-1/2" />
          {[...Array(4)].map((_, j) => (
            <Skeleton key={j} className="h-4 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}

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
  searchParams: { [key: string]: string | string[] | undefined };
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
      <MobileFilters categories={categories} sellers={sellers} />
    </div>
  );
}
