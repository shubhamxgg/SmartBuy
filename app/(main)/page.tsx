import { Suspense } from "react";
import { Category } from "@/components/category/category";
import { CategoryListSkeleton } from "@/components/category/category-list-skeleton";
import ItemBlog from "@/components/items/item-blog";
import ItemFeaturedBuy from "@/components/items/item-featured-buy";
import { ProductSection } from "@/components/product/product-section";
import ProductCarousel from "@/components/product/product-carousel";
import CustomerTestimonial from "@/components/customer-testimonal";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-5">
      <ProductCarousel />
      <ProductSection categoryName="Mobile" />
      <ProductSection categoryName="Electronic" />
      <ProductSection categoryName="Fashion" />
      <ProductSection categoryName="Sports" />
      <Suspense fallback={<CategoryListSkeleton />}>
        <Category />
      </Suspense>
      <ItemFeaturedBuy />
      {/* <ItemBlog /> */}
      <CustomerTestimonial />
    </div>
  );
};

export default HomePage;
