import DashboardNavbar from "@/components/seller/seller-dashboard-navbar";
import DashboardSidebar from "@/components/seller/seller-dashboard-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col sm:pl-64">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;