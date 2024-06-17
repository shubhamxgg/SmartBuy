import { useState, useEffect, useCallback } from "react";
import useProductStore from "@/lib/store/use-products";
import useCategoryStore from "@/lib/store/useCategoryStore";

const brands = ["Apple", "Samsung", "Sony", "LG"];
const ratings = [5, 4, 3, 2, 1];

export const useFilters = () => {
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);
  const { setFilter, resetFilter } = useProductStore();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
    setFilter({
      priceRange,
      categories: selectedCategories,
      brands: selectedBrands,
    });
  }, [
    selectedCategories,
    selectedBrands,
    selectedRating,
    setFilter,
    priceRange,
    fetchCategories,
  ]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const handleBrandChange = useCallback((brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  }, []);

  const handleRatingChange = useCallback((rating: number) => {
    setSelectedRating((prev) => (prev === rating ? null : rating));
  }, []);

  const handlePriceChange = useCallback((newPriceRange: number[]) => {
    setPriceRange([newPriceRange[0], newPriceRange[1]] as [number, number]);
  }, []);

  const handleResetFilters = useCallback(() => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRating(null);
    resetFilter();
  }, [resetFilter]);

  return {
    categories,
    brands,
    ratings,
    priceRange,
    selectedCategories,
    selectedBrands,
    selectedRating,
    handleCategoryChange,
    handleBrandChange,
    handleRatingChange,
    handlePriceChange,
    handleResetFilters,
  };
};
