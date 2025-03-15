import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../utils/supabaseClient.js";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user || null); // Set user if authenticated, otherwise null
      } catch (error) {
        console.error("Error checking session", error);
      } finally {
        setLoading(false); // Set loading to false after checking session
      }
    };

    checkAuthStatus();
  }, []);

  // Loading state, can be a spinner or loading screen while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user is logged in, navigate to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Return protected content if the user is authenticated
  return children;
};

export default ProtectedRoute;
