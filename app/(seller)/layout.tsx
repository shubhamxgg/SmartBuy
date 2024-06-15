import Sidebar from "@/components/home-layout/side-bar";
import SellerLeftbar from "@/components/seller/seller-leftbar";
import SellerNavbar from "@/components/seller/seller-navbar";

const SellerDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <SellerLeftbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <SellerNavbar />
        <div className="flex-1 py-4 md:py-5">{children}</div>
      </div>
    </div>
  );
};

export default SellerDashboard;
