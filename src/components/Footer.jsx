import { Link } from "react-router-dom";
import Logo from "../assets/KW-logo.png";

const links = [
  { link: "/", label: "Home" },
  { link: "/recipes", label: "Recipes" },
  { link: "/blogs", label: "Blogs" },
];

export function FooterSimple() {
  return (
    <div className="mt-4 bg-darkblue px-2">
      <div className="flex justify-between items-center py-4 md:flex-col md:items-center">
        <div className="text-ybrown text-xl font-bold font-cagliostro mx-4">
          <Link to="/">
            <img src={Logo} alt="MyLogo" className="h-32 w-auto" />
          </Link>
        </div>
        <div className="space-x-4 md:space-x-4 mx-4">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.link}
              className="text-lg font-cagliostro font-semibold text-ybrown hover:text-orange"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
