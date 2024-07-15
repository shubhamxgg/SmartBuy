"use client";
import { useCallback } from "react";
import { Skeleton } from "../ui/skeleton";
import ItemCategoryCard from "./item-category-card";
import useCategories from "@/hooks/use-categories";
import { ChevronRight } from "lucide-react";

const ItemCategory = () => {
  const { categories, isLoading, error } = useCategories();

  const renderCategories = useCallback(() => {
    if (isLoading) {
      return Array(5).fill(0).map((_, index) => (
        <Skeleton key={index} className="w-40 h-24 rounded-md" />
      ));
    }

    if (error) {
      return <div className="text-red-500 font-medium">Failed to load categories. Please try again later.</div>;
    }

    return categories.map((item) => (
      <ItemCategoryCard key={item.id} item={item} />
    ));
  }, [categories, isLoading, error]);

  return (
    <div className="py-6 space-y-4 mb-5 border rounded-lg bg-card">
      <div className="flex items-center justify-between px-6 pb-4 border-b">
        <h2 className="text-2xl font-bold">Shop by Category</h2>
        <button className="text-primary hover:text-primary/80 flex items-center text-sm font-medium transition-colors">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      <div className="px-6 overflow-hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
          {renderCategories()}
        </div>
      </div>
    </div>
  );
};

export default ItemCategory;