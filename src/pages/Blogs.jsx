import React, { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";
import BlogCard from "../components/BlogCard";
import LoadingSpinner from "../UI/LoadingSpinner"; // Import the spinner

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from("blogs").select("*");

      if (error) console.error(error.message);
      else setBlogs(data);

      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-beige mt-12">
      <div className="my-14 text-center mx-auto max-w-2xl motion-preset-slide-right motion-duration-2000">
        <h1 className="text-5xl font-oleo font-bold text-darkblue border-b-4 border-orange py-4 inline-block">
          Blogs
        </h1>
        <p className="text-darkblue text-lg mt-4 font-marko">
          Have a favorite dish you tried? Visited a restaurant worth sharing?
          This is the place to tell your food stories! Share your culinary
          experiences, from home-cooked meals to exciting restaurant
          discoveries.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner className="h-12 w-12 text-orange" />
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 motion-preset-slide-right motion-duration-2000">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center mt-6">
          No blogs available yet. Be the first to share your food experience!
        </p>
      )}
    </div>
  );
}
