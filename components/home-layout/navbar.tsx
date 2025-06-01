"use client";

import Link from "next/link";
import { Store, Search } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const SearchBar = dynamic(() => import("../searchbar"), { ssr: false });
const Sidebar = dynamic(() => import("./home-sidebar"), { ssr: true });

const CartPageDynamic = dynamic(() => import("../cart/cart-page"), {
  ssr: false,
});
const UserDropdownDynamic = dynamic(() => import("./user-dropdown"), {
  ssr: false,
});

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
                width={192}
                height={56}
                className="h-14 w-48 border"
              />
            </Link>
            <Suspense fallback="Loading Sidebar">
              <Sidebar />
            </Suspense>
          </div>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <Suspense
              fallback={
                <div className="h-10 bg-muted/20 animate-pulse rounded-md" />
              }
            >
              <SearchBar />
            </Suspense>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/search" className="md:hidden">
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

            <Suspense fallback="Loading Cart">
              <CartPageDynamic />
            </Suspense>
            <Suspense fallback="Loading UserButton">
              <UserDropdownDynamic />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
