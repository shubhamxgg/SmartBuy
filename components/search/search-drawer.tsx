import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchSidebar from "./search-sidebar";

const SearchFilterDrawer = () => (
  <div className="md:hidden flex items-center w-full gap-2 p-2 mb-5 mt-auto sticky bottom-2 z-50 rounded-sm bg-card ">
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
        <SearchSidebar />
      </SheetContent>
    </Sheet>
  </div>
);

export default SearchFilterDrawer;
