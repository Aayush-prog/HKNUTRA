import { useNavigate, NavLink, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="text-primary font-primary">
      <nav className="border-b border-gray-200 px-8 h-16 flex items-center justify-center gap-x-64">
        <div className="flex-shrink-0">
          <Link to="/">
            <h2 className="text-xl font-bold">HKNUTRA</h2>
          </Link>
        </div>

        <div>
          <ul className="flex gap-20">
            <li>
              <NavLink to="/about" className="hover:text-green-600">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/membership" className="hover:text-green-600">
                Membership
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className="hover:text-green-600">
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/community" className="hover:text-green-600">
                Community
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-green-600">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex-shrink-0">
          <button
            className="px-4 py-1 bg-primary text-white rounded hover:bg-green-600"
            onClick={() => navigate("/login")}
          >
            Join Now
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
