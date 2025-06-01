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

const ProductPage = async ({ params }: PageProps) => {
  const id = parseInt(params.id, 10);
  const product = await getProductById(id);
  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }
  return <ProductClient initialProduct={product} id={params.id} />;
};

export default ProductPage;
