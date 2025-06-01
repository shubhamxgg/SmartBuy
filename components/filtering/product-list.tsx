"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { RetryButton } from "../retry-button";
import { Suspense } from "react";

const Pagination = dynamic(() => import("./pagination"), {
  ssr: false,
});

const ProductGrid = dynamic(() => import("./product-grid"), {
  ssr: false,
});

export async function fetchProducts(searchParams: Record<string, string>) {
  const queryString = new URLSearchParams(searchParams).toString();
  const response = await fetch(`/api/search?${queryString}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

function ProductGridSkeleton() {
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

function ProductListSkeleton() {
  return (
    <div>
      <Skeleton className="h-6 w-48 mb-4" />
      <ProductGridSkeleton />
      <Skeleton className="h-10 w-full mt-6" />
    </div>
  );
}

export default function ProductList({
  searchParams: initialSearchParams,
}: any) {
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", searchParams.toString()],
    queryFn: () =>
      fetchProducts({ ...initialSearchParams, ...searchParamsObject }),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <ProductListSkeleton />;
  if (error) return <RetryButton error={error.message} onClick={refetch} />;

  const { products, total, page, totalPages } = data || {
    products: [],
    total: 0,
    page: 1,
    totalPages: 1,
  };

  return (
    <>
      <p className="mb-4 text-gray-600">{total} products found</p>
      <Suspense fallback="Loading...">
        <ProductGrid products={products} />
      </Suspense>

      <Suspense fallback="Loading...">
        <Pagination currentPage={page} totalPages={totalPages} />
      </Suspense>
    </>
  );
}
