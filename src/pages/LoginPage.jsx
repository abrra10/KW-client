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
    // Check if the user is already logged in and navigate to the profile page
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        navigate("/profile"); // Redirect if logged in
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

      // Step 1: Sign in the user
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) throw authError;

      const user = authData.user;

      // Step 2: Fetch the latest profile data after login
      let { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") throw profileError;

      // Step 3: If no profile exists, create one
      if (!profile) {
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            username: email.split("@")[0], // Default username
            avatar_url: null,
          },
        ]);

        if (insertError) throw insertError;

        // Fetch the new profile again after inserting
        const { data: newProfile, error: newProfileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (newProfileError) throw newProfileError;

        profile = newProfile;
      }

      // Store user and profile in state or context to trigger UI update
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/profile/recipes"), 1500);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setFormData((prevData) => ({ ...prevData, password: "" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center mt-10 bg-beige">
      <div className="w-full max-w-sm sm:max-w-md bg-ybrown p-6 sm:p-10 rounded-lg shadow-lg space-y-4 font-marko">
        <h1 className="text-center text-3xl  font-semibold text-darkblue">
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
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
