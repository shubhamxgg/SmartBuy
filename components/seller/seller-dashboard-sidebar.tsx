import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
  FileText,
  Tag,
  Truck,
} from "lucide-react";
import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <div className="hidden fixed left-0 inset-y-0 flex-col h-full w-64 z-30 border-r bg-background sm:flex">
      <div className="flex flex-col gap-1 px-3 py-4">
        <Link
          href={"/"}
          className="flex items-center gap-2 px-3 py-2 mb-6 text-lg font-semibold text-primary"
        >
          <Package2 className="h-6 w-6" />
          <span>SmartBuy</span>
        </Link>
        <NavItem href="/dashboard" icon={Home} label="Home" />
        <NavItem href="/dashboard/orders" icon={ShoppingCart} label="Orders" />
        <NavItem href="/dashboard/products" icon={Package} label="Products" />
        <NavItem href="/dashboard/categories" icon={Tag} label="Categories" />
        <NavItem href="/dashboard/customers" icon={Users2} label="Customers" />
        <NavItem href="/dashboard/sellers" icon={Truck} label="Sellers" />
        <NavItem href="/dashboard/analytics" icon={LineChart} label="Analytics" />
        <NavItem href="/dashboard/reports" icon={FileText} label="Reports" />
      </div>
      <div className="mt-auto px-3 py-4">
        <NavItem href="/dashboard/settings" icon={Settings} label="Settings" />
      </div>
    </div>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const NavItem = ({ href, icon: Icon, label }: NavItemProps) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </Link>
);

export default DashboardSidebar;