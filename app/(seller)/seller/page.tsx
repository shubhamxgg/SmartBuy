import SellerCard from "@/components/seller/seller-card/seller-card";
import SellerRecentOrder from "@/components/seller/seller-card/seller-recent-order";
import SellerTable from "@/components/seller/seller-table";

const SellerHomePage = () => {
  return (
    <div className="grid flex-1 items-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-2 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <SellerCard />
        </div>
        {/* <SellerTable /> */}
      </div>
      <div>
        {/* <SellerRecentOrder /> */}
      </div>
    </div>
  );
};

export default SellerHomePage;
