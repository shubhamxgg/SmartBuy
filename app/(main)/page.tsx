import { Suspense } from "react";
// import { Category } from "@/components/category/category";
// import { CategoryListSkeleton } from "@/components/category/category-list-skeleton";
// import ItemFeaturedBuy from "@/components/items/item-featured-buy";
// import { ProductSection } from "@/components/product/product-section";
// import ProductCarousel from "@/components/product/product-carousel";
// import CustomerTestimonial from "@/components/customer-testimonal";
import dynamic from "next/dynamic";
import { CategoryListSkeleton } from "@/components/category/category-list-skeleton";
import ProductSection from "@/components/product/product-section";

const ProductCarousel = dynamic(
  () => import("@/components/product/product-carousel"),
  { ssr: true }
);

const CustomerTestimonial = dynamic(
  () => import("@/components/customer-testimonal"),
  { ssr: false }
);

const ItemFeaturedBuy = dynamic(
  () => import("@/components/items/item-featured-buy"),
  { ssr: false }
);

const Category = dynamic(() => import("@/components/category/category"), {
  ssr: true,
});

const LazyProductSection = dynamic(
  () => import("@/components/product/product-section"),
  { ssr: true }
);

const HomePage = () => {
  return (
    <div className="flex flex-col gap-5">
      <ProductCarousel />

      <ProductSection categoryName="Mobile" />

      <Suspense fallback={<div>Loading category...</div>}>
        <LazyProductSection categoryName="Electronic" />
      </Suspense>
      <Suspense fallback={<div>Loading category...</div>}>
        <LazyProductSection categoryName="Fashion" />
      </Suspense>
      <Suspense fallback={<div>Loading category...</div>}>
        <LazyProductSection categoryName="Sports" />
      </Suspense>
      <Suspense fallback={<CategoryListSkeleton />}>
        <Category />
      </Suspense>
      <Suspense fallback={<div>Loading featured items...</div>}>
        <ItemFeaturedBuy />
      </Suspense>
      <Suspense fallback={<div>Loading testimonials...</div>}>
        <CustomerTestimonial />
      </Suspense>
    </div>
  );
};

export default HomePage;
