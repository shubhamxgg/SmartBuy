"use client";

import React, { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import useItemData from "@/hooks/use-item";
import ProductSkeleton from "@/components/products/product-skeleton";
import ProductBreadcrumbs from "@/components/products/product-breadcrumb";
import SkeletonLoader from "@/components/skeleton-loader";
import { ProductSection } from "@/components/product/product-section";


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

const ProductPage = ({ params: { id } }: ItemPageProps) => {
  const { data: product, isLoading, error } = useItemData(Number(id));

  if (isLoading) return <ProductSkeleton />;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="hidden sm:block p-5">
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

      <Suspense fallback={<SkeletonLoader />}>
        <ProductSection categoryName="Mobile" />
      </Suspense>

      <div className="py-5 md:py-10 flex flex-col lg:flex-row gap-5 p-2 md:p-4 rounded-sm">
        <Suspense fallback={<SkeletonLoader />}>
          <ProductCustomerRatings ratings={product.reviews} />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <ProductReviews reviews={product.reviews} />
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(ProductPage);
