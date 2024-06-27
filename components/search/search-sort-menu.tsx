"use client";
import { useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = {
  featured: "Featured",
  discount: "Discount",
  priceLowToHigh: "Price low to high",
  priceHighToLow: "Price high to low",
};

const SearchSortMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sort, setSort] = useState<string>();
  const handleSortChange = useCallback(
    (criteria: string) => {
      setSort(criteria);
      const query = new URLSearchParams(searchParams.toString());
      if (criteria) {
        query.set("sort", criteria);
      } else {
        query.delete("sort");
      }
      router.push(`${pathname}?${query.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-md">Sort by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"default"} size={"sm"} className="flex gap-2">
            {/* {SORT_OPTIONS[sort]} */}
            <ArrowDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {Object.entries(SORT_OPTIONS).map(([key, label]) => (
            <DropdownMenuItem key={key} onClick={() => handleSortChange(key)}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchSortMenu;
