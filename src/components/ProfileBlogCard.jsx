import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const ProfileBlogCard = ({ blog, onEdit, onDelete }) => {
  // ✅ Handle cases where `blog` is undefined
  if (!blog) {
    return <div className="text-red-500 p-4">Error: Blog data not found.</div>;
  }

  return (
    <div className="bg-ybrown shadow-md rounded-lg overflow-hidden flex flex-col sm:flex-row items-center p-4 gap-4">
      {/* ✅ Safe Image Handling */}
      <div className="w-full sm:w-32 h-auto sm:h-32 flex items-center justify-center">
        {blog.image ? (
          <img
            src={`https://hwkykpbyqjzegmzzzjvx.supabase.co/storage/v1/object/public/blog-images/${blog.image.trim()}`}
            alt={blog.title || "Blog Image"}
            className="w-full h-full object-cover rounded-md"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      {/* ✅ Safe Text Handling */}
      <div className="flex-1 p-2 sm:p-4 w-full">
        <div className="flex justify-between items-center font-marko text-orange">
          <h3 className="text-lg sm:text-xl font-semibold capitalize">
            {blog.title || "Untitled"}
          </h3>
          <div className="flex gap-3 sm:gap-2">
            <button onClick={() => onEdit(blog)} className="text-darkblue">
              <Pencil size={22} />
            </button>
            <button onClick={() => onDelete(blog.id)} className="text-darkblue">
              <Trash2 size={22} />
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-md text-gray-700 mt-2 font-marko font-semibold line-clamp-2">
          {blog.content || "No content available."}
        </p>
      </div>
    </div>
  );
};

export default ProfileBlogCard;
