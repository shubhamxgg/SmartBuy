import ItemCard from "@/components/items/item-card";
import Filter from "@/components/search/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon, ArrowLeft } from "lucide-react";
import Image from "next/image";

const Search = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex items-center justify-start p-4 md:p-6 font-bold mt-3 mb-4 lg:mt-10 lg:mb-5 text-lg md:text-xl">
        <span className="pl-8">31 results for a</span>
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
              <DropdownMenuItem>Featured</DropdownMenuItem>
              <DropdownMenuItem>Discount</DropdownMenuItem>
              <DropdownMenuItem>Price low to high</DropdownMenuItem>
              <DropdownMenuItem>Price high to low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 p-5">
        <div className="hidden md:block md:col-span-1">
          <Filter />
        </div>

        <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="border p-3 bg-card rounded-sm">
              <Image
                alt=""
                src="/user.jpg"
                height={200}
                width={200}
                className="overflow-hidden object-cover aspect-square w-full rounded-sm"
              />
              <div className="flex flex-col gap-2">
                <span className="mt-2">Pixel</span>
                <span className="mt-2">700</span>
                <Button>Add to cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
