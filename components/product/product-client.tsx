"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { useProductDetails } from "@/hooks/use-product-details";
import ProductSkeleton from "@/components/products/product-skeleton";
import ProductBreadcrumbs from "@/components/products/product-breadcrumb";
import SkeletonLoader from "@/components/skeleton-loader";
import { RetryButton } from "../retry-button";

const ProductImages = dynamic(
  () => import("@/components/products/product-images"),
  { ssr: false }
);
const ProductDetails = dynamic(
  () => import("@/components/products/product-details"),
  { ssr: true }
);

const ProductCustomerRatings = dynamic(
  () => import("@/components/products/product-customer-ratings"),
  { ssr: false }
);

const ProductReviews = dynamic(
  () => import("@/components/products/product-reviews"),
  { ssr: false }
);

interface ProductClientProps {
  id: string;
  initialProduct: any;
}

const ProductClient = ({ id, initialProduct }: ProductClientProps) => {
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useProductDetails(Number(id), initialProduct);

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
        <Suspense fallback="Loading..">
          <ProductImages product={product} />
        </Suspense>

        <Suspense fallback="Loading..">
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

export default ProductClient;
