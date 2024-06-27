import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useFilterStore } from "@/store/useFilterStore";

const useSyncURLWithState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    selectedBrands,
    selectedCategories,
    priceRange,
    selectedRating,
    setPriceRange,
    setBrandFilter,
    setRatingFilter,
    setCategoryFilter,
  } = useFilterStore();

  useEffect(() => {
    const categories = searchParams.get("categories");
    const brands = searchParams.get("brands");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const rating = searchParams.get("rating");

    if (categories) {
      setCategoryFilter(categories.split(","));
    }
    if (brands) {
      setBrandFilter(brands.split(","));
    }
    if (minPrice && maxPrice) {
      setPriceRange([parseFloat(minPrice), parseFloat(maxPrice)]);
    }
    if (rating) {
      setRatingFilter(parseInt(rating, 10));
    }
  }, [
    searchParams,
    setCategoryFilter,
    setBrandFilter,
    setPriceRange,
    setRatingFilter,
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }
    if (priceRange[0] !== 0 && priceRange[1] !== 1000) {
      params.set("minPrice", priceRange[0].toString());
      params.set("maxPrice", priceRange[1].toString());
    }
    if (selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join(","));
    }
    if (selectedRating !== null) {
      params.set("rating", selectedRating.toString());
    }

    const queryString = params.toString();
    if (queryString) {
      router.push(`${pathname}?${queryString}`, { scroll: false });
    } else {
      router.push(pathname, { scroll: false });
    }
  }, [
    selectedCategories,
    priceRange,
    selectedBrands,
    selectedRating,
    router,
    pathname,
  ]);
};

export default useSyncURLWithState;
