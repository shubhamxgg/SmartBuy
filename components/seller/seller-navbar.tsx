import React from "react";
import Sidebar from "../home-layout/side-bar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";
import Searchbar from "../searchbar";
import SellerUserDropdown from "./seller-userdrop";
import SellerSearchbar from "./seller-searchbar";
import SellerBreadCrumblist from "./seller-breadcrumblist";
import SellerLeftbar from "./seller-leftbar";

const SellerNavbar = () => {
  return (
    <div className="sticky top-0 h-16 w-full flex items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:bg-transparent sm:border-0 sm:px-6 z-30">
      <Sidebar />
      <SellerBreadCrumblist />
      <SellerSearchbar />
      <SellerUserDropdown />
    </div>
  );
};

export default SellerNavbar;
