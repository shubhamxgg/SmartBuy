import { useCallback, useEffect } from "react";
import useCategoryStore from "@/store/useCategoryStore";
import { useFilterStore } from "@/store/useFilterStore";

const brands = ["Apple", "Samsung", "Sony", "LG"];
const ratings = [5, 4, 3, 2, 1];

export const useSearchFilters = () => {
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  const {
    selectedCategories,
    selectedBrands,
    selectedRating,
    priceRange,
    setCategoryFilter,
    setBrandFilter,
    setRatingFilter,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  const handleCategoryChange = useCallback(
    (category: string) => {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
      setCategoryFilter(newCategories);
    },
    [selectedCategories, setCategoryFilter]
  );

  const handleBrandChange = useCallback(
    (brand: string) => {
      const newBrands = selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands, brand];
      setBrandFilter(newBrands);
    },
    [selectedBrands, setBrandFilter]
  );

  const handleRatingChange = useCallback(
    (rating: number) => {
      const newRating = selectedRating === rating ? null : rating;
      setRatingFilter(newRating);
    },
    [selectedRating, setRatingFilter]
  );

  const handlePriceChange = useCallback(
    (newPriceRange: [number, number]) => {
      if (
        newPriceRange[0] !== priceRange[0] ||
        newPriceRange[1] !== priceRange[1]
      ) {
        setPriceRange(newPriceRange);
      }
    },
    [priceRange, setPriceRange]
  );

  const handleResetFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

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
