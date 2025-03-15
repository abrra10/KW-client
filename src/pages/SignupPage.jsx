import React, { useState } from "react";
import supabase from "../utils/supabaseClient";
import { HiCloudUpload } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });

      if (error) throw error;
      const userId = data?.user?.id;
      if (!userId) throw new Error("User ID not found after signup.");

      let avatarUrl = null;

      // Step 2: Upload profile picture if provided
      if (profilePic) {
        const { data: imageData, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(`profile_${userId}`, profilePic, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        avatarUrl = `${supabase.storage
          .from("avatars")
          .getPublicUrl(imageData.path)}`;
      }

      // Step 3: Insert profile data
      const { error: profileInsertError } = await supabase
        .from("profiles")
        .upsert([{ id: userId, username, email, avatar_url: avatarUrl }]);

      if (profileInsertError) throw profileInsertError;

      // Email verification alert
      toast.success(
        "Signup successful! Please check your email to verify your account.",
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          theme: "colored",
        }
      );

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Error:", err.message);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-10 bg-beige ">
      <ToastContainer />
      <div className="w-full max-w-sm sm:max-w-md bg-ybrown p-2 sm:p-6 rounded-lg shadow-lg space-y-4 font-marko">
        <h1 className="text-center text-3xl font-semibold py-1 text-darkblue">
          Get Started Today
        </h1>
        <p className="text-center text-sm sm:text-base text-darkblue">
          Already have an account?{" "}
          <Link to="/login" className="text-orange hover:underline">
            Log in
          </Link>
        </p>

        <form onSubmit={handleSignup} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword && (
              <div className="absolute right-3 top-9">
                {password === confirmPassword ? (
                  <HiCheckCircle className="text-green-500 w-7 h-7" />
                ) : (
                  <HiXCircle className="text-red-500 w-7 h-7" />
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange text-bluedark rounded-md cursor-pointer opacity-90 hover:opacity-100 transition relative">
              <HiCloudUpload className="w-6 h-6 text-darkblue" />
              <span className="text-darkblue font-semibold">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
              {profilePic && (
                <HiCheckCircle className="absolute right-3 top-3 text-darkblue w-6 h-6" />
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange opacity-90 hover:opacity-100 text-darkblue py-3 rounded-md text-center font-semibold transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
