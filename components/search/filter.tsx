"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "../ui/slider";
import useProductStore from "@/lib/store/use-products";
import { Button } from "../ui/button";

const Filter = () => {
  const { setFilter, resetFilter } = useProductStore();
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const categories = [
    "Electronic",
    "Fashion",
    "Home",
    "Books",
    "Clothing",
    "Home_Appliance",
  ];
  const brands = ["Apple", "Samsung", "Sony", "LG"];
  const ratings = [5, 4, 3, 2, 1];

  useEffect(() => {
    setFilter({ priceRange, categories: selectedCategories });
  }, [selectedCategories, setFilter, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating((prev) => (prev === rating ? null : rating));
  };

  const handlePriceChange = (newPriceRange: number[]) => {
    setPriceRange([newPriceRange[0], newPriceRange[1]] as [number, number]);
  };

  const handleResetFilters = () => {
    setPriceRange([10, 1000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRating(null);
    resetFilter();
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Category</h2>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <Checkbox
              onCheckedChange={() => handleCategoryChange(category)}
              checked={selectedCategories.includes(category)}
            />
            <span className="ml-2">{category}</span>
          </div>
        ))}
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
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-2">
            <Checkbox
              onCheckedChange={() => handleBrandChange(brand)}
              checked={selectedBrands.includes(brand)}
            />
            <span className="ml-2">{brand}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Rating</h2>
        {ratings.map((rating) => (
          <div key={rating} className="flex items-center mb-2">
            <Checkbox
              onCheckedChange={() => handleRatingChange(rating)}
              checked={selectedRating === rating}
            />
            <span className="ml-2">{rating} Stars</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </div>
    </div>
  );
};

export default Filter;
