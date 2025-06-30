import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col min-h-[300px] md:min-h-[380px] justify-center items-center bg-primary font-primary text-white py-8 md:py-12">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-40 text-center md:text-left text-sm md:text-base justify-items-center">
          {/* Column 1 - HKNUTRA */}
          <div>
            <h2 className="text-2xl font-bold">HKNUTRA</h2>
            <p className="text-sm md:text-base mt-4">
              © {new Date().getFullYear()} HKNUTRA. All Rights Reserved.
            </p>
          </div>

          {/* Column 2 - Employee */}
          <div>
            <h2
              className="font-bold mb-2 text-base md:text-lg"
              id="links-heading"
            >
              Quick Links
            </h2>
            <ul aria-labelledby="links-heading" className="space-y-1">
              <li>
                <a href="/" aria-label="Home">
                  Home
                </a>
              </li>
              <li>
                <a href="/committee" aria-label="Committee">
                  Committee
                </a>
              </li>
              <li>
                <a href="/about" aria-label="About Us">
                  About Us
                </a>
              </li>
              <li>
                <a href="/membership" aria-label="Membership">
                  Membership
                </a>
              </li>
              <li>
                <a href="/event" aria-label="Events">
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h2
              className="font-bold mb-2 text-base md:text-lg"
              id="stay-touch-heading"
            >
              Stay In Touch
            </h2>
            <ul aria-labelledby="stay-touch-heading">
              <li>
                <a href="/contact-us" aria-label="Contact Us">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex justify-center px-2 md:px-6">
          <div className="flex space-x-5 text-xl md:text-2xl">
            <a href="#" aria-label="Visit our Facebook page">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Visit our Twitter page">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Visit our Instagram page">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
