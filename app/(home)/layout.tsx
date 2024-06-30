import Footer from "@/components/home-layout/footer";
import Navbar from "@/components/home-layout/navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black">
      <div className="px-5 top-2 sticky mx-auto z-50 bg-transparent">
        <Navbar />
      </div>
      <div className="mx-auto min-h-screen w-full max-w-7xl pt-5">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
