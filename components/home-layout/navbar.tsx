import Link from "next/link";
import { BaggageClaimIcon, Store } from "lucide-react";
import SearchBar from "../searchbar";
import UserDropdown from "./user-dropdown";

import CartPage from "./cart";
import HomePageSidebar from "./home-sidebar";

const Navbar = () => {
  return (
    <div className="bg-card border backdrop-blur-lg px-4 md:px-8 py-2 flex items-center justify-between  z-50 rounded-md shadow-md">
      <div className="flex items-center gap-4">
        <HomePageSidebar />
        <Link href="/" className="hidden sm:flex items-center gap-2">
          <BaggageClaimIcon className="h-6 w-6 font-bold text-foreground" />
          <span className="text-foreground text-xl font-bold">SmartBuy</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar />

        <Link
          href="/dashboard"
          className="hidden md:flex items-center gap-2 text-sm text-foreground"
        >
          <Store className="h-5 w-5" />
        </Link>

        <CartPage />

        <UserDropdown />
      </div>
    </div>
  );
};

export default Navbar;
