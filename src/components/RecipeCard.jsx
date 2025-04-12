import React from "react";
import { Timer } from "lucide-react";
import defaultImage from "../assets/default-recipe.jpg"; // Import your default image
import { LuExternalLink } from "react-icons/lu";
import { LuUtensilsCrossed } from "react-icons/lu";

const RecipeCard = ({ recipe }) => {
  if (!recipe.image && !defaultImage) return null;

  return (
    <a
      href={recipe.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group"
    >
      <div className="overflow-hidden transition-all duration-100 hover:scale-105 flex flex-col sm:flex-row items-center p-3 sm:p-4 md:px-6 md:p-4 bg-ybrown rounded-3xl shadow-xl">
        {/* Stadium-Shaped Image */}
        <div className="w-full sm:w-28 md:w-32 h-40 sm:h-48 md:h-60 flex-shrink-0 rounded-tl-3xl rounded-br-3xl shadow-xl overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="object-cover w-full h-full"
            onError={(e) => (e.target.src = defaultImage)} // Default image fallback
          />
        </div>

        {/* Recipe Content */}
        <div className="mt-3 sm:mt-0 sm:ml-4 md:ml-6 flex-1 w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-orange font-oleo line-clamp-2">
            {recipe.title}
          </h2>

          {/* Cooking Time & Servings */}
          <div className="mt-2 flex flex-col gap-1 font-marko">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-darkblue">
              <Timer className="text-darkblue w-3 h-3 sm:w-4 sm:h-4" />
              Ready in {recipe.readyInMinutes} mins
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-darkblue">
              <LuUtensilsCrossed className="text-darkblue w-3 h-3 sm:w-4 sm:h-4" />
              Servings: {recipe.servings}
            </div>
          </div>

          {/* View Recipe Link */}
          <span className="text-darkblue flex items-center text-sm sm:text-md font-semibold font-marko mt-3 sm:mt-4 group-hover:opacity-80 transition-colors duration-300">
            View Recipe
            <LuExternalLink className="text-base sm:text-lg ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </a>
  );
};

export default RecipeCard;
