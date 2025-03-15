import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";

export default function BlogCard({ blog }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (!blog.user_id) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", blog.user_id)
        .single();

      if (error) {
        console.error("Error fetching user:", error.message);
        setError("Failed to load user");
      } else {
        setUser(data);
      }
      setLoading(false);
    }

    fetchUser();
  }, [blog.user_id]);

  return (
    <div className="flex flex-col md:flex-row overflow-hidden px-14 mb-2">
      {/* Blog Image */}
      <div className="w-full h-80 md:w-80 md:h-80 flex-shrink-0 flex items-center justify-center">
        {blog.image ? (
          <img
            src={`https://hwkykpbyqjzegmzzzjvx.supabase.co/storage/v1/object/public/blog-images/${blog.image?.trim()}`}
            alt={blog.title || "Blog Image"}
            className="w-full h-full object-cover rounded-tl-2xl rounded-br-3xl shadow-2xl"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <span className="text-gray-500">No Image Available</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1 min-h-[200px]">
        {/* Title & Author Info */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold  capitalize w-2/3 truncate font-marko text-orange">
            {blog.title}
          </h2>
          <div className="flex items-center gap-2 font-marko">
            {loading ? (
              <span className="text-gray-500 text-sm">Loading author...</span>
            ) : error ? (
              <span className="text-red-500 text-sm">{error}</span>
            ) : (
              <>
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.username || "User Avatar"}
                    className="w-8 h-8 rounded-full object-cover border-2 border-orange"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm text-gray-600">
                    ?
                  </div>
                )}
                <span className="text-sm text-orange font-semibold capitalize font-marko truncate w-20">
                  {user?.username || "Unknown User"}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <blockquote className="mt-2 text-gray-700 text-sm overflow-hidden font-marko">
          "{blog.content}"
        </blockquote>

        {/* Date */}
        <p className="text-xs text-gray-500 mt-2 font-oleo">
          {blog.created_at
            ? new Date(blog.created_at).toLocaleDateString()
            : "Unknown Date"}
        </p>
      </div>
    </div>
  );
}
