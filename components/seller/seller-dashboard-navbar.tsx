import { Bell, User } from "lucide-react";

const DashboardNavbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 border-b bg-background">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-accent">
          <Bell className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-accent">
          <User className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;