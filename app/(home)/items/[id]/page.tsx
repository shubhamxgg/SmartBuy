"use client";
import ItemSection from "@/components/items/item-section";
import ProductBreadcrumbs from "@/components/products/product-breadcrumb";
import ProductCustomerRatings from "@/components/products/product-customer-ratings";
import ProductDetails from "@/components/products/product-details";
import ProductImages from "@/components/products/product-images";
import ProductReviews from "@/components/products/product-reviews";
import ProductSkeleton from "@/components/products/product-skeleton";
import { getProductById } from "@/lib/actions/get-productById";

import { useEffect, useState } from "react";

interface ItemPageProps {
  params: {
    id: number;
  };
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: { id: number; name: string };
  seller: { id: number; user: { name: string } };
  stock: { sku: string; quantity: number; lowStockThreshold: number };
  images: { id: number; url: string }[];
  reviews: { id: number; rating: number; comment: string }[];
}

const ItemsPage = ({ params: { id } }: ItemPageProps) => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await getProductById(Number(id));
          setProduct(response);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading)
    return (
      <div>
        <ProductSkeleton />
      </div>
    );
  if (error) return <div>Error:</div>;
  if (!product) return <div>Product not found</div>;

  

  return (
    <div className="flex flex-col w-full">
      <div className="hidden sm:block p-5 ">
        <ProductBreadcrumbs category={product.category} title={product.title} />
      </div>

      <div className="flex flex-col lg:flex-row p-2 md:p-5">
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
