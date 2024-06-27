"use client";

import CategoryDetails from "@/components/form/category-detail";
import ImageDetails from "@/components/form/image-detail";
import ProductDetails from "@/components/form/product-detail";
import StatusDetails from "@/components/form/status-details";
import StockDetail from "@/components/form/stock-detail";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/lib/actions/create-product";
import useCategoryStore from "@/store/useCategoryStore";
import { ProductStatus } from "@prisma/client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

const CreateOrder = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [lowStockThreshold, setLowStockThreshold] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [status, setStatus] = useState<ProductStatus>(ProductStatus.AVAILABLE);
  const [featured, setFeatured] = useState(false);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<FileList | null>(
    null
  );

  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const sellerId = 1;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      title: name,
      description,
      price: parseFloat(price as string),
      imageUrl: mainImage
        ? URL.createObjectURL(mainImage)
        : "https://m.media-amazon.com/images/I/71xb2xkN5qL._AC_SY400_.jpg",
      categoryId: parseInt(category),
      sellerId,
      status,
      featured,
      sku,
      quantity: parseInt(quantity as string),
      lowStockThreshold: parseInt(lowStockThreshold as string),
      additionalImages: additionalImages
        ? Array.from(additionalImages).map((file) => URL.createObjectURL(file))
        : [],
    };

    try {
      await createProduct(formData);
      toast.success("Product created successfully:");
      resetForm();
    } catch (error) {
      toast.error("Failed to create product:");
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setSku("");
    setQuantity("");
    setLowStockThreshold("");
    setCategory("");
    setSubcategory("");
    setStatus(ProductStatus.AVAILABLE);
    setFeatured(false);
    setMainImage(null);
    setAdditionalImages(null);
  };

  return (
    <form className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 md:gap-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Create Product</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CategoryDetails
            category={category}
            setCategory={setCategory}
            subcategory={subcategory}
            setSubcategory={setSubcategory}
            categories={categories}
          />
          <ProductDetails
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
          />
          <StockDetail
            sku={sku}
            setSku={setSku}
            quantity={quantity}
            setQuantity={setQuantity}
            lowStockThreshold={lowStockThreshold}
            setLowStockThreshold={setLowStockThreshold}
          />
          <StatusDetails
            status={status}
            setStatus={setStatus}
            featured={featured}
            setFeatured={setFeatured}
          />
          <ImageDetails
            mainImage={mainImage}
            setMainImage={setMainImage}
            additionalImages={additionalImages}
            setAdditionalImages={setAdditionalImages}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Save Product
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateOrder;
