"use client";
import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { useSearchFilters } from "@/hooks/use-sidebar-filters";

const SearchSidebar = () => {
  const {
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
  } = useSearchFilters();

  const renderCategoryCheckboxes = useMemo(
    () =>
      categories.map((category) => (
        <div key={category.id} className="flex items-center mb-2">
          <Checkbox
            id={`category-${category}`}
            onCheckedChange={() => handleCategoryChange(category.name)}
            checked={selectedCategories.includes(category.name)}
          />
          <label htmlFor={`category-${category}`} className="ml-2">
            {category.name}
          </label>
        </div>
      )),
    [categories, selectedCategories, handleCategoryChange]
  );

  const renderBrandCheckboxes = useMemo(
    () =>
      brands.map((brand) => (
        <div key={brand} className="flex items-center mb-2">
          <Checkbox
            id={`brand-${brand}`}
            onCheckedChange={() => handleBrandChange(brand)}
            checked={selectedBrands.includes(brand)}
          />
          <label htmlFor={`brand-${brand}`} className="ml-2">
            {brand}
          </label>
        </div>
      )),
    [brands, selectedBrands, handleBrandChange]
  );

  const renderRatingCheckboxes = useMemo(
    () =>
      ratings.map((rating) => (
        <div key={rating} className="flex items-center mb-2">
          <Checkbox
            id={`rating-${rating}`}
            onCheckedChange={() => handleRatingChange(rating)}
            checked={selectedRating === rating}
          />
          <label htmlFor={`rating-${rating}`} className="ml-2">
            {rating} Stars
          </label>
        </div>
      )),
    [ratings, selectedRating, handleRatingChange]
  );

  return (
    <div className="p-4">
      <div className="mb-6 w-full">
        <Button onClick={handleResetFilters} className="w-full">
          Reset Filters
        </Button>
      </div>
      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Category</h2>
        {renderCategoryCheckboxes}
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Price Range</h2>
        <Slider
          min={0}
          max={1000}
          step={50}
          defaultValue={priceRange}
          onValueChange={handlePriceChange}
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Brand</h2>
        {renderBrandCheckboxes}
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Rating</h2>
        {renderRatingCheckboxes}
      </div>
    </div>
  );
};

export default SearchSidebar;
