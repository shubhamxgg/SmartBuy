"use client";
import { useMemo } from "react";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { useSearchFilters } from "@/hooks/use-sidebar-filters";
import { Star, X, Check } from "lucide-react";

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

  const renderCategories = useMemo(
    () => (
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`p-3 rounded-lg border text-sm ${
              selectedCategories.includes(category.name)
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:border-primary/50'
            } transition-colors duration-200 flex items-center justify-between`}
            onClick={() => handleCategoryChange(category.name)}
          >
            <span>{category.name}</span>
            {selectedCategories.includes(category.name) && <Check className="w-4 h-4" />}
          </button>
        ))}
      </div>
    ),
    [categories, selectedCategories, handleCategoryChange]
  );

  const renderBrands = useMemo(
    () => (
      <div className="grid grid-cols-2 gap-2">
        {brands.map((brand) => (
          <button
            key={brand}
            className={`p-3 rounded-lg border text-sm ${
              selectedBrands.includes(brand)
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:border-primary/50'
            } transition-colors duration-200 flex items-center justify-between`}
            onClick={() => handleBrandChange(brand)}
          >
            <span>{brand}</span>
            {selectedBrands.includes(brand) && <Check className="w-4 h-4" />}
          </button>
        ))}
      </div>
    ),
    [brands, selectedBrands, handleBrandChange]
  );

  const renderRatings = useMemo(
    () => (
      <div className="flex flex-wrap gap-2">
        {ratings.map((rating) => (
          <Button
            key={rating}
            variant={selectedRating === rating ? "default" : "outline"}
            size="sm"
            className="flex items-center"
            onClick={() => handleRatingChange(rating)}
          >
            {rating} <Star className="w-3 h-3 ml-1 fill-current" />
          </Button>
        ))}
      </div>
    ),
    [ratings, selectedRating, handleRatingChange]
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Filters</h2>
        <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-primary">
          <X className="w-4 h-4 mr-1" /> Clear All
        </Button>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Category</h3>
        {renderCategories}
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={50}
          defaultValue={priceRange}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Brand</h3>
        {renderBrands}
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Rating</h3>
        {renderRatings}
      </div>
    </div>
  );
};

export default SearchSidebar;