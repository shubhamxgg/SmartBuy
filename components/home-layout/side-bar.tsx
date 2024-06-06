import {
  HomeIcon,
  LineChartIcon,
  Package2Icon,
  PackageIcon,
  PanelLeft,
  Share2Icon,
  ShoppingCartIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="sm:hidden" variant={"outline"} size={"sm"}>
          <PanelLeft className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            href="#"
          >
            <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            href="#"
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            className="flex items-center gap-4 px-2.5 text-foreground"
            href="#"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Orders
          </Link>
          <Link
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            href="#"
          >
            <PackageIcon className="h-5 w-5" />
            Products
          </Link>
          <Link
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            href="#"
          >
            <Share2Icon className="h-5 w-5" />
            Customers
          </Link>
          <Link
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            href="#"
          >
            <LineChartIcon className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
