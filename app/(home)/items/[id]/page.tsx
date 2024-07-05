"use client";
import ItemSection from "@/components/items/item-section";
import ProductBreadcrumbs from "@/components/products/product-breadcrumb";
import ProductCustomerRatings from "@/components/products/product-customer-ratings";
import ProductDetails from "@/components/products/product-details";
import ProductImages from "@/components/products/product-images";
import ProductReviews from "@/components/products/product-reviews";
import ProductSkeleton from "@/components/products/product-skeleton";
import useItemData from "@/hooks/use-item";

interface ItemPageProps {
  params: {
    id: number;
  };
}

const ItemsPage = ({ params: { id } }: ItemPageProps) => {
  const { data: product, isLoading, error } = useItemData(Number(id));

  if (isLoading) return <ProductSkeleton />;
  if (error) return <div>Error:</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="hidden sm:block p-5">
        <ProductBreadcrumbs category={product.category} title={product.title} />
      </div>

      <div className="flex flex-col gap-2 lg:flex-row p-2 md:p-5">
        <ProductImages product={product} />
        <ProductDetails product={product} />
      </div>

      <ItemSection title="Mobile" />

      <div className="py-5 md:py-10 flex flex-col lg:flex-row gap-5 p-2 md:p-4  rounded-sm">
        <ProductCustomerRatings ratings={product.reviews} />

        <ProductReviews reviews={product.reviews} />
      </div>
    </div>
  );
};

export default ItemsPage;
