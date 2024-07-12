"use client";

import { useFormState } from "react-dom";

import CategoryDetails from "@/components/form/category-detail";
import ImageDetails from "@/components/form/image-detail";

import StatusDetails from "@/components/form/status-details";
import StockDetail from "@/components/form/stock-detail";
import { Button } from "@/components/ui/button";
import useCategoryStore from "@/store/useCategoryStore";
import { useEffect } from "react";
import { toast } from "sonner";
import ProductDetails from "@/components/form/product-detail-from";
import { createProduct } from "@/lib/actions/create-product";

const initialState: {
  message: string | null;
  errors: Record<string, string[] | undefined>;
} = { message: null, errors: {} };

const CreateOrder = () => {
  const [state, formAction] = useFormState(createProduct as any, initialState);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (state?.message) {
      if (state.message === "success") {
        toast.success("Product created successfully");
      } else {
        toast.error(`Failed to create product: ${state.message}`);
      }
    }
  }, [state]);

  return (
    <form
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
          <Button variant="outline" type="reset">
            Cancel
          </Button>
          <Button type="submit">Save Product</Button>
        </div>
      </div>
    </form>
  );
};

export default CreateOrder;
