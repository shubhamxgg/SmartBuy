import React from "react";
import Link from "next/link";
import { FacebookIcon, Instagram, Linkedin, Twitter } from "lucide-react";

const footerData = {
  aboutUs:
    "We are span leading e-commerce platform providing top-notch services and products to our customers.",
  contact: {
    email: "support@estore.com",
    phone: "+1 (123) 456-7890",
    address: "123 E-commerce St, Shop City, SC 12345",
  },
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  socialMedia: [
    { label: "Facebook", href: "https://facebook.com", icon: <FacebookIcon /> },
    { label: "Twitter", href: "https://twitter.com", icon: <Twitter /> },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: <Instagram />,
    },
    { label: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin /> },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-card text-white py-10 w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p>{footerData.aboutUs}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>Email: {footerData.contact.email}</p>
            <p>Phone: {footerData.contact.phone}</p>
            <p>Address: {footerData.contact.address}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              {footerData.quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link href={link.href}>
                    <span className="text-white hover:underline">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {footerData.socialMedia.map((social, index) => (
                <Link key={index} href={social.href}>
                  <span className="text-white hover:text-gray-400 flex flex-col gap-2">
                    {social.icon} {social.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
