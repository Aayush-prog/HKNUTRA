import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/logoGreen.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white fixed top-0 left-0 w-full shadow z-50">
      <nav className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between font-primary text-primary">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="HKNUTRA Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 mr-3"
          />
          <h2 className="text-lg sm:text-xl font-bold">HKNUTRA</h2>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 lg:gap-12 items-center">
          {[
            { to: "/about", label: "About" },
            { to: "/membership", label: "Membership" },
            { to: "/events", label: "Events" },
            { to: "/community", label: "Community" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `transition-colors duration-300 hover:text-green-600 ${
                    isActive ? "text-green-600 font-semibold" : ""
                  }`
                }
                aria-label={`Go to ${label} page`}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate("/login")}
          className="hidden md:block ml-2 px-4 py-1 bg-primary text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Join Now
        </button>
        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-4 py-4">
          <ul className="flex flex-col gap-4 items-center">
            {[
              { to: "/about", label: "About" },
              { to: "/membership", label: "Membership" },
              { to: "/events", label: "Events" },
              { to: "/community", label: "Community" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block transition-colors duration-300 hover:text-green-600 ${
                      isActive ? "text-green-600 font-semibold" : ""
                    }`
                  }
                  aria-label={`Go to ${label} page`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Join Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
