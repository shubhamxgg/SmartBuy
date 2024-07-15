"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, User, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import useAuthModalStore from "@/store/useAuthModalStore";

const NavbarItems = [
  { title: "Account", icon: User, href: "/account" },
  { title: "Orders", icon: ShoppingCart, href: "/orders" },
  { title: "Wishlist", icon: Heart, href: "/wishlist" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

const UserDropdown = () => {
  const { isAuthenticated, user, logout, checkAuth } = useAuthStore();
  const { openModal } = useAuthModalStore();
  const router = useRouter();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = () => openModal();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-sm" size="icon" variant="ghost">
          <Avatar >
            {isAuthenticated && user ? (
              <AvatarImage
                src={"https://github.com/shadcn.png"}
                alt={user.name}
                
              />
            ) : null}
            <AvatarFallback>
              {isAuthenticated && user
                ? user.name.charAt(0).toUpperCase()
                : "NL"}
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
                <Link href={item.href} className="flex items-center">
                  <item.icon className="h-4 w-4 mr-2" />
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
          <DropdownMenuItem onClick={handleLogin} className="cursor-pointer">
            <User className="h-4 w-4 mr-2" />
            Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
