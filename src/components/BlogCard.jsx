import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";

export default function BlogCard({ blog }) {
  const [username, setUsername] = useState("Unknown User");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!blog.user_id) return;

    const fetchUsername = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", blog.user_id)
          .single();

        if (error) throw error;
        setUsername(data?.username || "Unknown User");
      } catch (error) {
        console.error("Error fetching username:", error.message);
        setError("Failed to load author");
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
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
        {/* Title & Author */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold capitalize w-2/3 truncate font-marko text-orange">
            {blog.title}
          </h2>
          <div className="text-sm text-orange font-semibold capitalize font-marko truncate w-20">
            {loading ? (
              <span className="text-gray-500 text-sm">Loading...</span>
            ) : error ? (
              <span className="text-red-500 text-sm">{error}</span>
            ) : (
              username
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
