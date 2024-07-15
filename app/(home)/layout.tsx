import Footer from "@/components/home-layout/footer";
import Navbar from "@/components/home-layout/navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-tr from-primary/10 to-secondary/10">
      <div className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Navbar />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
