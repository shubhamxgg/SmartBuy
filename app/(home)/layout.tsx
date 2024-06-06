import Footer from "@/components/home-layout/footer";
import Navbar from "@/components/home-layout/navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto min-h-screen w-full max-w-screen-xl">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default HomeLayout;
