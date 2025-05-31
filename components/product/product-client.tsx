"use client";

import React, { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import { useItemData } from "@/hooks/use-product-item";
import ProductSkeleton from "@/components/products/product-skeleton";
import ProductBreadcrumbs from "@/components/products/product-breadcrumb";
import SkeletonLoader from "@/components/skeleton-loader";
import { ProductSection } from "@/components/product/product-section";
import { RetryButton } from "../retry-button";

const ProductImages = dynamic(
  () => import("@/components/products/product-images"),
  { ssr: false }
);
const ProductDetails = dynamic(
  () => import("@/components/products/product-details"),
  { ssr: false }
);

const ProductCustomerRatings = lazy(
  () => import("@/components/products/product-customer-ratings")
);
const ProductReviews = lazy(
  () => import("@/components/products/product-reviews")
);

interface ItemPageProps {
  params: {
    id: number;
  };
}

const ProductClient = ({ id }: { id: number }) => {
  const { data: product, isLoading, error, refetch } = useItemData(Number(id));

  if (isLoading) return <ProductSkeleton />;
  if (error)
    return <RetryButton onClick={() => refetch()} error={error.message} />;
  if (!product) return <ProductSkeleton />;

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="p-2 md:p-4">
        <ProductBreadcrumbs category={product.category} title={product.title} />
      </div>

      <div className="flex flex-col gap-2 lg:flex-row p-2 md:p-5">
        <Suspense fallback={<SkeletonLoader />}>
          <ProductImages product={product} />
        </Suspense>
        <Suspense fallback={<div>Loading details...</div>}>
          <ProductDetails product={product} />
        </Suspense>
      </div>

      {/* <Suspense fallback={<SkeletonLoader />}>
        <ProductSection categoryName="Mobile" />
      </Suspense> */}

      <div className="py-5 md:py-10 flex flex-col lg:flex-row gap-5 p-2 md:p-4 rounded-sm">
        <Suspense fallback={<SkeletonLoader />}>
          <ProductCustomerRatings ratings={[]} />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <ProductReviews reviews={[]} />
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(ProductClient);
