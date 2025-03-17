import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import supabase from "../utils/supabaseClient";
import SignInBtn from "../UI/SignInBtn";
import { ChevronDown, User, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/KW-logo.png";
import defaultProfilePic from "../assets/default-wizard.png";

const Navbar = () => {
  const { user, profile, setUser, loading, error } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-darkblue h-20 flex items-center px-4 md:px-8 fixed top-0 w-full z-50">
      {/* Logo - Hidden on Small Screens */}
      <div className="hidden md:block">
        <Link to="/">
          <img src={Logo} alt="MyLogo" className="h-32 w-auto" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-ybrown focus:outline-none"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        {isNavOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav Links */}
      {isNavOpen && (
        <div className="absolute top-16 left-0 w-full bg-darkblue shadow-md flex flex-col items-center py-4 space-y-2 md:hidden">
          <Link
            to="/"
            className="text-ybrown text-lg font-bold hover:text-orange"
            onClick={() => setIsNavOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/recipes"
            className="text-ybrown text-lg font-bold hover:text-orange"
            onClick={() => setIsNavOpen(false)}
          >
            Recipes
          </Link>
          <Link
            to="/blogs"
            className="text-ybrown text-lg font-bold hover:text-orange"
            onClick={() => setIsNavOpen(false)}
          >
            Blogs
          </Link>
        </div>
      )}

      {/* Desktop Nav Links */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-6 font-cagliostro">
        <Link
          to="/"
          className="text-ybrown text-sm md:text-[16px] font-bold hover:text-orange"
        >
          Home
        </Link>
        <Link
          to="/recipes"
          className="text-ybrown text-sm md:text-[16px] font-bold hover:text-orange"
        >
          Recipes
        </Link>
        <Link
          to="/blogs"
          className="text-ybrown text-sm md:text-[16px] font-bold hover:text-orange"
        >
          Blogs
        </Link>
      </div>

      {/* Profile/Auth Section */}
      <div className="flex space-x-3 md:space-x-4 items-center font-cagliostro ml-[195px] md:ml-auto">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-ybrown text-sm md:text-[16px] font-bold hover:text-orange"
            >
              Login
            </Link>
            <Link to="/signup">
              <SignInBtn text="Get Started" />
            </Link>
          </>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center space-x-2 p-2 ml-8 rounded-md hover:bg-[#1B435A] transition"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
            >
              {loading ? (
                <span className="text-gray-500 text-sm">Loading...</span>
              ) : error ? (
                <span className="text-red-500 text-sm">{error}</span>
              ) : (
                <>
                  <img
                    src={profile?.avatar || defaultProfilePic}
                    alt={profile?.name || "User Avatar"}
                    className="w-9 h-9 rounded-full object-cover"
                    onLoad={() => setAvatarLoaded(true)}
                    onError={(e) => {
                      e.target.src = defaultProfilePic;
                      setAvatarLoaded(true);
                    }}
                    style={{ visibility: avatarLoaded ? "visible" : "hidden" }}
                  />

                  <span className="text-ybrown font-semibold capitalize">
                    {profile?.name}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-ybrown transition-transform duration-200 ${
                      isMenuOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </>
              )}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-[78%] bg-ybrown rounded shadow-lg p-2 z-50 flex flex-col items-center text-center">
                <Link
                  to="/profile/recipes"
                  className="flex items-center gap-2 text-md font-semibold text-darkblue hover:text-orange w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-md font-semibold text-darkblue hover:text-orange mt-2 w-full justify-center"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
