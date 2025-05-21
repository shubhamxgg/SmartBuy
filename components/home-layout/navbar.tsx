import Link from "next/link";
import { BaggageClaimIcon, Store, Search, Menu } from "lucide-react";
import SearchBar from "../searchbar";
import UserDropdown from "./user-dropdown";
import CartPage from "../cart/cart-page";
import { Button } from "../ui/button";
import { Suspense } from "react";
import HomePageSidebar from "./home-sidebar";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="hidden sm:flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <Image
                src={"/logo/icon-text.svg"}
                alt="Logo"
                width={150}
                height={100}
                className="h-8 w-auto"
              />
            </Link>
            <HomePageSidebar />
          </div>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <Suspense
              fallback={
                <div className="h-10 bg-muted/20 animate-pulse rounded-md"></div>
              }
            >
              <SearchBar />
            </Suspense>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/search" className="sm:hidden">
              <Button
                variant="outline"
                size="sm"
                className="text-muted-foreground hover:bg-white/10"
              >
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="/dashboard"
              className="hidden md:flex items-center px-3 py-2 rounded-md text-sm font-medium bg-primary-foreground text-primary hover:bg-muted transition-colors"
            >
              <Store className="h-5 w-5 mr-2" />
              <span>Dashboard</span>
            </Link>
            <CartPage />
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
