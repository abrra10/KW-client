import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";

export default function BlogCard({ blog }) {
  const [username, setUsername] = useState("Unknown User");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

  // Function to toggle content expansion
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col md:flex-row overflow-hidden px-4 sm:px-8 md:px-14 mb-4 bg-beige">
      {/* Blog Image */}
      <div className="w-full h-48 sm:h-64 md:w-80 md:h-auto flex-shrink-0 flex items-center justify-center">
        {blog.image ? (
          <img
            src={`https://hwkykpbyqjzegmzzzjvx.supabase.co/storage/v1/object/public/blog-images/${blog.image?.trim()}`}
            alt={blog.title || "Blog Image"}
            className="w-full h-full object-cover rounded-tl-xl md:rounded-tl-xl md:rounded-bl-xl"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <span className="text-gray-500">No Image Available</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Title & Author */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mb-2">
          <h2 className="text-lg sm:text-xl font-semibold capitalize w-full sm:w-2/3 truncate font-marko text-orange">
            {blog.title}
          </h2>
          <div className="text-xs sm:text-sm text-orange font-semibold capitalize font-marko truncate w-full sm:w-20">
            {loading ? (
              <span className="text-gray-500 text-xs sm:text-sm">
                Loading...
              </span>
            ) : error ? (
              <span className="text-red-500 text-xs sm:text-sm">{error}</span>
            ) : (
              username
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 text-gray-700 text-xs sm:text-sm font-marko">
          <div
            className={`${
              isExpanded ? "" : "line-clamp-4 sm:line-clamp-6"
            } whitespace-pre-line`}
          >
            {blog.content}
          </div>

          {/* Show more/less button if content is long */}
          {blog.content && blog.content.length > 200 && (
            <button
              onClick={toggleExpand}
              className="text-orange text-xs sm:text-sm font-semibold mt-2 hover:underline focus:outline-none"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Date */}
        <p className="text-xs text-gray-500 mt-4 font-oleo">
          {blog.created_at
            ? new Date(blog.created_at).toLocaleDateString()
            : "Unknown Date"}
        </p>
      </div>
    </div>
  );
}
