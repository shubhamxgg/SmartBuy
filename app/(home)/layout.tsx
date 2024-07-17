import Footer from "@/components/home-layout/footer";
import Navbar from "@/components/home-layout/navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-primary/10 to-secondary/10">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="flex-grow max-w-8xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;