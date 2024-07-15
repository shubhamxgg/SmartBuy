import Link from "next/link";
import { BaggageClaimIcon, Store, Search } from "lucide-react";
import SearchBar from "../searchbar";
import UserDropdown from "./user-dropdown";
import CartPage from "./cart-page";
import { Button } from "../ui/button";
import { Suspense } from "react";

const Navbar = () => {
  return (
    <div className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <BaggageClaimIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold hidden sm:inline-block">SmartBuy</span>
          </Link>

          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar />
            </Suspense>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/product" className="sm:hidden">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/products" className="hidden md:flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Store className="h-5 w-5 mr-1" />
              <span>Dashboard</span>
            </Link>
            <CartPage />
            <UserDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;