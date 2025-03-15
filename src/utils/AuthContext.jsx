import { createContext, useContext, useState, useEffect } from "react";
import supabase from "./supabaseClient.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error) {
        setUser(user);
        if (user) fetchUserProfile(user.id);
      }
    };

    const fetchUserProfile = async (userId) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        setError("Failed to load profile");
      } else {
        let avatarUrl = "/default-avatar.png";
        if (data?.avatar_url) {
          avatarUrl = data.avatar_url.includes("avatars/")
            ? data.avatar_url
            : `https://hwkykpbyqjzegmzzzjvx.supabase.co/storage/v1/object/public/avatars/${data.avatar_url}`;
        }

        setProfile({ name: data.username || "User", avatar: avatarUrl });
      }
      setLoading(false);
    };

    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        if (session?.user) fetchUserProfile(session.user.id);
        else setProfile(null);
      }
    );

    return () => subscription?.unsubscribe?.();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, setUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
