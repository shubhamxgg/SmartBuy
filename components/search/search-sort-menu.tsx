import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon } from "lucide-react";

interface SortMenuProps {
  onSortChange: (criteria: string) => void;
}

const SORT_OPTIONS = {
  FEATURED: "Featured",
  DISCOUNT: "Discount",
  PRICE_LOW_TO_HIGH: "Price low to high",
  PRICE_HIGH_TO_LOW: "Price high to low",
};

const SearchSortMenu = ({ onSortChange }: SortMenuProps) => {
  const [selectedSort, setSelectedSort] = useState<string>(
    SORT_OPTIONS.FEATURED
  );

  const handleSortChange = (criteria: string) => {
    setSelectedSort(criteria);
    onSortChange(criteria);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-md">Sort by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"default"} size={"sm"} className="flex gap-2">
            {selectedSort}
            <ArrowDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {Object.values(SORT_OPTIONS).map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => handleSortChange(option)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchSortMenu;
