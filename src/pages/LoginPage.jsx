import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabaseClient";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        navigate("/profile");
      }
    };
    checkSession();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) throw authError;

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/profile/recipes"), 1500);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setFormData((prevData) => ({ ...prevData, password: "" }));
    } finally {
      setLoading(false);
    }
  };

  // Demo Login Handler
  const handleDemoLogin = () => {
    setFormData({ email: "benacer19000@gmail.com", password: "demo123" });
    setTimeout(() => handleLogin(new Event("submit")), 500); // Simulate form submission
  };

  return (
    <div className="min-h-screen flex justify-center items-center mt-10 bg-beige">
      <div className="w-full max-w-sm sm:max-w-md bg-ybrown p-6 sm:p-10 rounded-lg shadow-lg space-y-4 font-marko">
        <h1 className="text-center text-3xl font-semibold text-darkblue">
          Login to Your Account
        </h1>
        <p className="text-center text-sm sm:text-base text-darkblue">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange hover:underline">
            Sign up
          </Link>
        </p>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-darkblue">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-center transition text-darkblue font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange opacity-90 hover:opacity-100"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3 mt-2 bg-darkblue text-orange rounded-md text-center transition hover:bg-gray-700"
          >
            Login as Demo User
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
