import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-white font-primary py-8 md:py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-0 md:gap-12 lg:gap-20 text-center md:text-left">
          {/* Column 1 - Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <img src={Logo} alt="HKNUTRA Logo" className="w-32 md:w-40" />
            <p className="mt-4 text-xs sm:text-sm md:text-base">
              © {new Date().getFullYear()} HKNUTRA. All Rights Reserved.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h2 className="font-bold mb-3 text-sm sm:text-base md:text-lg">
              Quick Links
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm md:text-base">
              {[
                { href: "/", label: "Home" },
                { href: "/committee", label: "Committee" },
                { href: "/about", label: "About Us" },
                { href: "/membership", label: "Membership" },
                { href: "/event", label: "Events" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={`Go to ${label} page`}
                    className="relative inline-block after:block after:h-[2px] after:w-0 after:bg-green-300 after:transition-all after:duration-300 after:origin-left hover:after:w-full focus:after:w-full focus:outline-none focus:ring-2 focus:ring-green-300 rounded"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Stay in Touch */}
          <div>
            <h2 className="font-bold mb-3 text-sm sm:text-base md:text-lg">
              Stay In Touch
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm md:text-base">
              <li>
                <a
                  href="/contact-us"
                  aria-label="Go to Contact Us page"
                  className="relative inline-block after:block after:h-[2px] after:w-0 after:bg-green-300 after:transition-all after:duration-300 after:origin-left hover:after:w-full focus:after:w-full focus:outline-none focus:ring-2 focus:ring-green-300 rounded"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Social Icons */}
        <div className="mt-10 md:mt-16 flex justify-center">
          <div className="flex space-x-5 text-xl sm:text-2xl">
            {[
              { href: "#", Icon: FaFacebook, label: "Visit our Facebook page" },
              { href: "#", Icon: FaTwitter, label: "Visit our Twitter page" },
              {
                href: "#",
                Icon: FaInstagram,
                label: "Visit our Instagram page",
              },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-colors duration-300 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 rounded"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
