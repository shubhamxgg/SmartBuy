"use client";
import ItemCard from "@/components/items/item-card";
import Filter from "@/components/search/filter";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useProductStore from "@/lib/store/use-products";
import { ArrowDownIcon, ArrowLeft } from "lucide-react";
import Image from "next/image";

const Search = () => {
  const { filteredProducts, setSort } = useProductStore();
  const handleSortChange = (criteria: string) => {
    setSort(criteria);
  };
  console.log(filteredProducts);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex items-center justify-start p-4 md:p-6 font-bold mt-3 mb-4 lg:mt-5 lg:mb-2 text-lg md:text-xl">
        <span className="pl-8">{filteredProducts.length} results found</span>
        <div className="absolute md:hidden">
          <ArrowLeft className="h-5 w-5" />
        </div>
      </div>

      <div className="hidden lg:block w-full p-4 mb-5">
        <div className="flex items-center justify-end gap-2">
          <span className="text-md">Sort by:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"default"} size={"sm"} className="flex gap-2">
                Featured
                <ArrowDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleSortChange("Featured")}>
                Featured
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("Discount")}>
                Discount
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("Price low to high")}
              >
                Price low to high
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("Price high to low")}
              >
                Price high to low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 p-5">
        <div className="hidden md:block md:col-span-1">
          <Filter />
        </div>

        <div className="col-span-1 md:col-span-3 grid  xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
          {filteredProducts.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="md:hidden flex items-center w-full p-4 gap-2">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full" variant={"outline"}>
              Sort
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Sort</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col items-center justify-center gap-2 p-5 group cursor-pointer pb-16">
              <span>Featured</span>
              <span>Discount</span>
              <span>Price high to low</span>
              <span>Price low to high</span>
            </div>
          </DrawerContent>
        </Drawer>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full" variant={"outline"}>
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[600px] overflow-scroll">
            <Filter />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Search;
