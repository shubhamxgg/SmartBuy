import Image from "next/image";
import Link from "next/link";
// import SearchBar from "../search/search";
// import NavbarUserDropdown from "./user-dropdown";
import { Package2, ShoppingCart, Store } from "lucide-react";
import SearchBar from "../searchbar";
import UserDropdown from "./user-dropdown";
import Sidebar from "./side-bar";

const Navbar = () => {
  const session = true;
  return (
    <div className="sticky top-0 flex items-center h-16 w-full gap-4 px-4 md:px-8 border-b bg-card z-50">
      <div className="flex items-center justify-between w-full gap-3">
        <div>
          <Sidebar />
          <Link href="/" className="hidden sm:flex items-center gap-2">
            <Package2 className="h-6 w-6" />
            <span className="text-foreground">Nexus</span>
          </Link>
        </div>
        <div>
          <SearchBar />
        </div>

        <div className="flex gap-4">
          <Link
            href="/seller"
            className="hidden md:flex items-center gap-2 text-sm"
          >
            <Store className="h-5 w-5" />
            <span className="hidden text-clip">Became a seller</span>
          </Link>
          <Link href="/cart" className="flex items-center gap-2 text-sm">
            <ShoppingCart className="h-5 w-5" />
            {/* <span className="hidden md:block">Cart</span> */}
          </Link>

          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
