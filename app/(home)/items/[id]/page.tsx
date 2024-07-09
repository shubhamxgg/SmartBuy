"use client";

import React, { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import useItemData from "@/hooks/use-item";
import ProductSkeleton from "@/components/products/product-skeleton";
import ProductBreadcrumbs from "@/components/products/product-breadcrumb";

const ProductImages = dynamic(
  () => import("@/components/products/product-images"),
  { ssr: false }
);
const ProductDetails = dynamic(
  () => import("@/components/products/product-details"),
  { ssr: false }
);
const ItemSection = dynamic(() => import("@/components/items/item-section"), {
  ssr: false,
});
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

const ItemsPage = ({ params: { id } }: ItemPageProps) => {
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
        <Suspense fallback={<div>Loading images...</div>}>
          <ProductImages product={product} />
        </Suspense>
        <Suspense fallback={<div>Loading details...</div>}>
          <ProductDetails product={product} />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading item section...</div>}>
        <ItemSection title="Mobile" />
      </Suspense>

      <div className="py-5 md:py-10 flex flex-col lg:flex-row gap-5 p-2 md:p-4 rounded-sm">
        <Suspense fallback={<div>Loading ratings...</div>}>
          <ProductCustomerRatings ratings={product.reviews} />
        </Suspense>

        <Suspense fallback={<div>Loading reviews...</div>}>
          <ProductReviews reviews={product.reviews} />
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(ItemsPage);
