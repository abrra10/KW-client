import { Link } from "react-router-dom";
import { createContext, useContext } from "react";
import {
  ChevronLast,
  ChevronFirst,
  Settings,
  HelpCircle,
  Bookmark,
  FileText,
} from "lucide-react";

const SidebarContext = createContext();

const Sidebar = ({ expanded, setExpanded }) => {
  return (
    <aside
      className={`h-screen fixed left-0 top-16 bg-ybrown flex flex-col justify-between mt-4 transition-all duration-300 ${
        expanded ? "w-40" : "w-16"
      }`}
    >
      <nav className="h-full flex flex-col bg-ybrown transition-all duration-300">
        {/* Header */}
        <div className="p-4 pb-2 flex items-center justify-between">
          <h2
            className={`text-xl text-darkblue mr-1 font-bold font-cagliostro transition-all ${
              expanded ? "block" : "hidden"
            }`}
          >
            Dashboard
          </h2>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg bg-orange opacity-90 hover:opacity-100 transition flex justify-center items-center"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 flex flex-col justify-center px-2 space-y-2 font-cagliostro">
            <SidebarItem to="/profile/recipes" text="Recipes" icon={Bookmark} />
            <SidebarItem to="/profile/blogs" text="Blogs" icon={FileText} />
            <SidebarItem
              to="/profile/settings"
              text="Settings"
              icon={Settings}
            />
            <SidebarItem to="/profile/help" text="Help" icon={HelpCircle} />
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ to, text, icon: Icon }) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <li>
      <Link
        to={to}
        className="flex items-center py-2 px-3 text-darkblue hover:bg-orange font-bold rounded-md transition"
      >
        {/* ✅ Center Icons */}
        <div className="w-10 flex justify-center">
          <Icon size={22} />
        </div>

        {/* ✅ Smoothly Hide Text When Collapsed */}
        <span
          className={`ml-3 transition-all duration-300 ${
            expanded ? "opacity-100 block" : "opacity-0 hidden"
          }`}
        >
          {text}
        </span>
      </Link>
    </li>
  );
};

export default Sidebar;
