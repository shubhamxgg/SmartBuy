"use client";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, User, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const NavbarItems = [
  {
    title: "Account",
    icon: <User className="h-4 w-4" />,
    href: "/account",
  },
  {
    title: "Orders",
    icon: <ShoppingCart className="h-4 w-4" />,
    href: "/orders",
  },
  {
    title: "Wishlist",
    icon: <Heart className="h-4 w-4" />,
    href: "/wishlist",
  },
];

const UserDropdown = () => {
  const { isAuthenticated, user, logout, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = () => {
    router.push("/account");
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full flex gap-2 items-center"
          size="icon"
          variant="outline"
        >
          <Avatar>
            {isAuthenticated && user ? (
              <AvatarImage
                src={"https://github.com/shadcn.png"}
                alt={user.name}
              />
            ) : null}
            <AvatarFallback>
              {isAuthenticated && user
                ? user.name.charAt(0).toUpperCase()
                : "UG"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {isAuthenticated && user ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {NavbarItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link
                  href={item.href}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {NavbarItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link
                  href={item.href}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogin} className="cursor-pointer">
              <User className="h-4 w-4 mr-2" />
              Login
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
