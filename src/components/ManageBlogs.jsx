import React, { useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";
import BlogForm from "./BlogForm";
import ProfileBlogCard from "./ProfileBlogCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        fetchBlogs(user.id);
      }
    };

    fetchUserAndBlogs();
  }, []);

  const fetchBlogs = async (userId) => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching blogs:", error);
    } else {
      setBlogs(data);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (!error) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } else {
      console.error("Error deleting blog:", error);
    }
  };

  const refreshBlogs = async () => {
    if (userId) {
      await fetchBlogs(userId);
    }
    setEditingBlog(null);
    setIsFormVisible(false);

    // Show success notification
    toast.success("Blog uploaded successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <div className="p-6 no-scrollbar">
      <ToastContainer />
      <h2 className="text-4xl font-bold mb-4 font-marko text-darkblue">
        Manage Blogs
      </h2>

      <div className="space-y-4 mb-4">
        {blogs.map((blog) => (
          <ProfileBlogCard
            key={blog.id}
            blog={blog}
            onEdit={(blog) => {
              setEditingBlog(blog);
              setIsFormVisible(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            setEditingBlog(null);
            setIsFormVisible(true);
          }}
          className="bg-orange opacity-90 hover:opacity-100 text-darkblue py-3 px-4 my-4 rounded-md text-center font-semibold font-marko transition"
        >
          + Add New Blog
        </button>
      </div>

      {isFormVisible && (
        <BlogForm initialData={editingBlog || {}} onSuccess={refreshBlogs} />
      )}
    </div>
  );
};

export default ManageBlogs;
