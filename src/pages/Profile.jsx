import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../UI/Sidebar";
import SavedRecipes from "../components/SavedRecipes";
import ManageBlogs from "../components/ManageBlogs";
import Settings from "./Settings";
import Help from "./Help";

const Profile = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="flex bg-beige no-scrollbar mt-16">
      {/* Sidebar */}
      <Sidebar
        expanded={isSidebarExpanded}
        setExpanded={setIsSidebarExpanded}
      />

      {/* Main Content - Adjust margin based on sidebar state */}
      <div
        className={`flex-1 p-8 h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar transition-all duration-300 ${
          isSidebarExpanded ? "ml-40" : "ml-16"
        }`}
      >
        <Routes>
          <Route path="recipes" element={<SavedRecipes />} />
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
