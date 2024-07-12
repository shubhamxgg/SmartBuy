"use client";

import { useFormState } from "react-dom";
import CategoryDetails from "@/components/form/category-detail";
import ImageDetails from "@/components/form/image-detail";
import StatusDetails from "@/components/form/status-details";
import StockDetail from "@/components/form/stock-detail";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import ProductDetails from "@/components/form/product-detail-from";
import { createProduct } from "@/lib/actions/create-product";
import { CancelButton } from "@/components/form/from-canecl-button";
import { SaveProductButton } from "@/components/form/form-button";
import useCategories from "@/hooks/use-categories";

const initialState: { message: string; errors: Record<string, string[]> } = {
  message: "",
  errors: {},
};

const CreateOrder = () => {
  const [state, formAction] = useFormState(createProduct, initialState);
  const { categories, isLoading, error } = useCategories();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message === "success") {
      toast.success("Product created successfully");
      formRef.current?.reset();
    } else if (state?.message) {
      toast.error(`Failed to create product: ${state.message}`);
    }
  }, [state]);

  const handleCancel = () => {
    formRef.current?.reset();
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error}</div>;

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6"
    >
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 md:gap-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Create Product</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CategoryDetails categories={categories} />
          <ProductDetails />
          <StockDetail />
          <StatusDetails />
          <ImageDetails />
        </div>
        <div className="flex justify-end gap-2">
          <CancelButton onCancel={handleCancel} />
          <SaveProductButton />
        </div>
      </div>
    </form>
  );
};

export default CreateOrder;
