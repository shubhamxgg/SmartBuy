'use client'
import { useState } from 'react';
import {
  HomeIcon,
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/orders", icon: ShoppingBagIcon, label: "Orders" },
  { href: "/wishlist", icon: HeartIcon, label: "Wishlist" },
  { href: "/account", icon: UserIcon, label: "Account" },
  { href: "/settings", icon: SettingsIcon, label: "Settings" },
];

const HomePageSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="fixed top-4 left-4 z-50 sm:hidden" variant="outline" size="icon">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
        <motion.div 
          className="flex flex-col h-full bg-background/95 backdrop-blur-sm p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">SmartBuy</h1>
            <p className="text-sm text-muted-foreground mt-2">Your one-stop shop for smart deals</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                isActive={pathname === item.href}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>
          <div className="mt-auto space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              © 2023 SmartBuy. All rights reserved.
            </p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="h-4 w-4 mr-2" />
              Close Menu
            </Button>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ href, icon: Icon, label, isActive, onClick }: NavItemProps) => (
  <Link href={href} onClick={onClick}>
    <motion.div
      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
        isActive
          ? "bg-primary/10 text-primary shadow-lg"
          : "bg-background/50 text-foreground hover:bg-primary/5 hover:shadow-md"
      } backdrop-blur-sm`}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="h-6 w-6 mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  </Link>
);

export default HomePageSidebar;