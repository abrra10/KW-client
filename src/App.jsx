import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Blogs from "./pages/Blogs";
import { AuthProvider } from "./utils/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import { FooterSimple } from "./components/Footer";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop /> {/* Ensures scroll resets on navigation */}
        <Navbar />
        <MainContent />
      </Router>
    </AuthProvider>
  );
};

const MainContent = () => {
  const location = useLocation(); // Get the current location/path

  // Check if we're on the profile page or a subroute of /profile
  const isProfilePage = location.pathname.startsWith("/profile");

  return (
    <div className="no-scrollbar">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Conditionally render the FooterSimple component */}
      {!isProfilePage && <FooterSimple />}
    </div>
  );
};

export default App;
