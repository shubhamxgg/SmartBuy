'use client'
import {
  HomeIcon,
  Package2Icon,
  PackageIcon,
  PanelLeft,
  ShoppingCartIcon,
  User,
  Settings,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: HomeIcon, label: "Dashboard" },
  { href: "/orders", icon: ShoppingCartIcon, label: "Orders" },
  { href: "/wishlist", icon: PackageIcon, label: "Wishlist" },
  { href: "/account", icon: User, label: "Account" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

const HomePageSidebar = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="sm:hidden" variant="outline" size="sm">
          <PanelLeft className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            href="/"
          >
            <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">NexMarket</span>
          </Link>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem = ({ href, icon: Icon, label, isActive }: NavItemProps) => (
  <Link
    className={`flex items-center gap-4 px-2.5 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
    }`}
    href={href}
  >
    <Icon className="h-5 w-5" />
    {label}
  </Link>
);

export default HomePageSidebar;
