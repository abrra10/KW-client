import React, { useState } from "react";
import supabase from "../utils/supabaseClient";
import { HiCloudUpload } from "react-icons/hi";

const BlogForm = ({ initialData = {}, onSuccess }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const isEditing = !!initialData.id;

  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `blogs/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file);

    if (error) throw new Error("Image upload failed.");

    return fileName;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim() || !content.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User is not authenticated.");

      let imageUrl = initialData.image || null;
      if (image) {
        imageUrl = await uploadImage(image);
        if (!imageUrl) throw new Error("Image upload failed.");
      }

      if (isEditing) {
        const { error } = await supabase
          .from("blogs")
          .update({ title, content, image: imageUrl })
          .eq("id", initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("blogs")
          .insert([{ title, content, image: imageUrl, user_id: user.id }]);
        if (error) throw error;
      }
      onSuccess();
    } catch (err) {
      console.error("Error:", err.message);
      setErrorMessage(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 font-marko max-w-lg mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg"
    >
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => {
          if (e.target.value.length <= 12) {
            setTitle(e.target.value);
          }
        }}
        placeholder="Blog Title"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange focus:outline-none"
      />

      {/* Content Textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, 400))}
        placeholder="Blog Content"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange focus:outline-none h-32 resize-none"
      ></textarea>

      {/* Upload Image */}
      <div className="flex justify-center">
        <label className="flex items-center justify-center w-full sm:w-2/3 gap-2 px-3 py-3 bg-orange text-darkblue font-semibold rounded-md cursor-pointer opacity-90 hover:opacity-100 transition">
          <HiCloudUpload className="w-6 h-6" />
          <span>Upload Image</span>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1 text-center">{errorMessage}</p>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className={`w-full sm:w-2/3 bg-orange opacity-90 hover:opacity-100 text-darkblue py-3 px-4 rounded-md text-center font-semibold transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
