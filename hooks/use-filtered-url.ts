
import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SortOptionKey, useFilterStore } from "@/store/useFilterStore";

const useSyncURLWithState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    selectedBrands,
    selectedCategories,
    priceRange,
    selectedRating,
    sort,
    setPriceRange,
    setBrandFilter,
    setRatingFilter,
    setCategoryFilter,
    setSortFilter,
    resetFilters,
  } = useFilterStore();

  useEffect(() => {
    const categories = searchParams.get("categories");
    const brands = searchParams.get("brands");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const rating = searchParams.get("rating");
    const sort = searchParams.get("sort") as SortOptionKey;

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
    if (
      sort &&
      ["featured", "discount", "priceLowToHigh", "priceHighToLow"].includes(
        sort
      )
    ) {
      setSortFilter(sort);
    }
  }, [
    searchParams,
    setCategoryFilter,
    setBrandFilter,
    setPriceRange,
    setRatingFilter,
    setSortFilter,
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }
    if (priceRange[0] && priceRange[1]) {
      params.set("minPrice", priceRange[0].toString());
      params.set("maxPrice", priceRange[1].toString());
    }
    if (selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join(","));
    }
    if (selectedRating !== null) {
      params.set("rating", selectedRating.toString());
    }
    if (sort) {
      params.set("sort", sort);
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
    sort,
    router,
    pathname,
  ]);

  useEffect(() => {
    return () => {
      resetFilters();
    };
  }, [resetFilters]);
};

export default useSyncURLWithState;
