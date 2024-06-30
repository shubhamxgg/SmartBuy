import Image from "next/image";
import Link from "next/link";
// import SearchBar from "../search/search";
// import NavbarUserDropdown from "./user-dropdown";
import { Package2, ShoppingCart, Store, User2Icon } from "lucide-react";
import SearchBar from "../searchbar";
import UserDropdown from "./user-dropdown";
import Sidebar from "./side-bar";
import CartSheet from "./cart";

const Navbar = () => {
  const session = true;
  return (
    <div className="flex items-center h-16 max-w-[1240px] gap-4 px-4 md:px-8 border-b bg-card mx-auto z-50 rounded-sm">
      <div className="flex items-center justify-between w-full gap-3 px-2">
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

        <div className="flex items-center gap-4">
          <Link
            href="/seller"
            className="hidden md:flex items-center gap-2 text-sm"
          >
            <Store className="h-5 w-5" />
            <span className="hidden text-clip">Became a seller</span>
          </Link>

          {/* <div className="flex items-center gap-2 text-sm">
            <ShoppingCart className="h-5 w-5" />
          </div> */}
          <CartSheet />

          <Link href={"/account"}>
            <User2Icon />
          </Link>

          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
