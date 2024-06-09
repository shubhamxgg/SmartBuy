import Sidebar from "@/components/home-layout/side-bar";
import SellerLeftbar from "@/components/seller/seller-leftbar";
import SellerNavbar from "@/components/seller/seller-navbar";

const SellerDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <SellerLeftbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <SellerNavbar />
        <div className="flex-1 py-12 md:py-16">{children}</div>
      </div>
    </div>
  );
};

export default SellerDashboard;
