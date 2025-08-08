import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-white font-primary py-10 md:py-14">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Logo and Social Icons Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-0">
          {/* Logo and Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src={Logo} alt="HKNUTRA Logo" className="w-32 md:w-40" />
            <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200">
              © {new Date().getFullYear()} HKNUTRA. All Rights Reserved.
            </p>
          </div>

          {/* Social Icons aligned with text */}
          <div className="flex space-x-6 text-2xl mt-4 md:mt-0">
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
                className="text-white hover:text-green-300 transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-300 rounded"
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
