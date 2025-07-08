import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginPic from "../assets/login.webp";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = import.meta.env.VITE_URL;
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    if (!email) {
      setErrors("Email is required.");
      setLoading(false);
      return;
    }
    if (!password) {
      setErrors("Password is required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${api}/login`, { email, password });
      if (response.status === 200) {
        login(response.data.token, response.data.role, response.data.id);
        navigate("/admin/");
      }
    } catch (err) {
      const msg = err.response?.data?.msg || "Login failed. Please try again.";
      setErrors(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-5xl">
        {/* Form Section */}
        <div className="flex items-center justify-center p-6 sm:p-10 font-secondary">
          <form className="w-full max-w-[400px]" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-extrabold text-primary py-6">
              Admin Login
            </h2>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className="border text-sm mt-2 pl-3 w-full h-9 rounded-md focus:outline-none border-gray-400 focus:border-blue-500 focus:border-2 text-gray-600"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="pw" className="text-base">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="pw"
                  className="border text-sm pl-3 pr-10 w-full h-9 rounded-md focus:outline-none border-gray-400 focus:border-blue-500 focus:border-2 text-gray-600"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-primary focus:outline-none"
                >
                  {showPassword ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errors && <p className="text-red-600 text-xs mt-1">{errors}</p>}

            {/* Submit Button */}
            <button
              className={`px-4 py-2 w-full rounded-md mt-10 text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-blue-800"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:block">
          <img
            src={loginPic}
            alt="login pic"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
