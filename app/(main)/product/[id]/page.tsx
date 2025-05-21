import React, { Suspense, lazy } from "react";
import ProductClient from "@/components/product/product-client";
import { getProductById } from "@/lib/actions/product";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps) {
  const id = parseInt(params.id, 10);
  const product = await getProductById(id);
  return {
    title: product.title
      ? `${product.title} - Product Details`
      : "Product Details",
    description: product.description
      ? product.description
      : "Product details page",
  };
}

const ProductPage = ({ params }: { params: { id: number } }) => {
  return <ProductClient id={params.id} />;
};

export default ProductPage;
