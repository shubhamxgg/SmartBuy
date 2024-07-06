import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const NavbarItems = [
  {
    title: "Account",
    icon: <User className="h-4 w-4" />,
    href: "/account",
  },
  {
    title: "Order",
    icon: <ShoppingCart className="h-4 w-4" />,
    href: "/order",
  },
  {
    title: "Wishlist",
    icon: <Heart className="h-4 w-4" />,
    href: "/wishlist",
  },
];

const UserDropdown = async () => {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full flex gap-2 items-center"
          size="icon"
          variant="outline"
        >
          {user ? (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      {user ? (
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>
            <div className="flex gap-2 items-center p-5 w-full">
              <Image
                alt="Avatar"
                className="overflow-hidden rounded-full"
                height={24}
                src={user.imageUrl!}
                width={24}
              />
              <span>{user.firstName}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-52" align="center">
          {NavbarItems.map((item) => (
            <DropdownMenuItem key={item.href}>
              <Link href={item.href} className="flex gap-4 items-center p-1">
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserDropdown;
