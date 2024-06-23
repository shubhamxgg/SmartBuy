import { useState, useEffect, useCallback } from "react";
import useProductStore from "@/lib/store/use-products";
import useCategoryStore from "@/lib/store/useCategoryStore";
import { getFilteredProducts } from "@/lib/actions/get-filter-product";
import { useFilteredStore } from "@/lib/store/use-filter";

const brands = ["Apple", "Samsung", "Sony", "LG"];
const ratings = [5, 4, 3, 2, 1];

export const useFilters = () => {
  const { setFilter, resetFilter } = useProductStore();
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);
  const { currentPage, pageSize, setPage } = useFilteredStore();
  //
  const [products, setProducts] = useState<any>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const filters = {
          categoryNames: selectedCategories,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          brand: selectedBrands.length ? selectedBrands[0] : undefined,
          minRating: selectedRating,
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        };

        const { products, totalProducts } = await getFilteredProducts(filters);
        setProducts(products);
        setTotalProducts(totalProducts);
      } catch (error) {
        console.error("Failed to fetch filtered products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [
    selectedCategories,
    selectedBrands,
    selectedRating,
    priceRange,
    currentPage,
    pageSize,
  ]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
      setPage(1);
    },
    [setPage]
  );

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
  }, []);

  return {
    setPage,
    loading,
    totalProducts,
    products,
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
