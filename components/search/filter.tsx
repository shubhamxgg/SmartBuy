"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "../ui/slider";

const Filter = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const categories = ["Electronics", "Fashion", "Home", "Books"];
  const brands = ["Apple", "Samsung", "Sony", "LG"];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Category</h2>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <Checkbox />
            <span className="ml-2">{category}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Price Range</h2>
        <Slider min={0} max={1000} step={50} defaultValue={priceRange} />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Brand</h2>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-2">
            <Checkbox />
            <span className="ml-2">{brand}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Rating</h2>
        {ratings.map((rating) => (
          <div key={rating} className="flex items-center mb-2">
            <Checkbox />
            <span className="ml-2">{rating} Stars</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
