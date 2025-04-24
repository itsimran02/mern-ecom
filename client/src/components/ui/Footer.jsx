import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#F0F0F0] py-[50px] md:py-[70px] mt-[50px] md:mt-[70px]">
      <div className="max-w-[1620px] w-full mx-auto px-4 py-10 flex flex-col lg:flex-row justify-between gap-10">
        {/* Logo & Socials */}
        <div className="flex flex-col gap-4 max-w-sm">
          <h2 className="md:text-[33px] text-[28px] font-bold font-main">
            SHOP.COM
          </h2>
          <p className="text-black/60 font-secondary">
            We have clothes that suit your style and which
            you’re proud to wear. From women to men.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 text-black/70 hover:text-black" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5 text-black/70 hover:text-black" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 text-black/70 hover:text-black" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 text-black/70 hover:text-black" />
            </a>
          </div>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3">
          <h3 className="font-secondary font-bold text-lg">
            Company
          </h3>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            About
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Features
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Works
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Careers
          </a>
        </div>

        {/* Help */}
        <div className="flex flex-col gap-3">
          <h3 className="font-secondary font-bold text-lg">
            Help
          </h3>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Customer Support
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Delivery Details
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Terms & Conditions
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Privacy Policy
          </a>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-3">
          <h3 className="font-secondary font-bold text-lg">
            FAQ
          </h3>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Account
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Manage Deliveries
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Orders
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Payments
          </a>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-3">
          <h3 className="font-secondary font-bold text-lg">
            Resources
          </h3>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Free eBooks
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Development Tutorial
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            How to - Blog
          </a>
          <a
            href="#"
            className="text-black/60 hover:text-black font-secondary"
          >
            Youtube Playlist
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/10 mt-4">
        <p className="text-center text-black/60 py-4">
          Shop.co © 2000-2023, All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
