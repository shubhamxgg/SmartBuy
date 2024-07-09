import { Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="bg-card text-white py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <Facebook />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <Twitter />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <Instagram />
          </a>
        </div>
        <p className="text-gray-400">&copy; 2024 Nex Company</p>
        <Button
          size="default"
          variant="outline"
          className="text-gray-400 hover:text-white hidden sm:block"
        >
          Subscribe
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
