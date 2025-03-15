import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard.jsx";
import Pagination from "../UI/Pagination.jsx";
import LoadingSpinner from "../UI/LoadingSpinner";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 20;
  const CACHE_KEY = "cachedRecipes";
  const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://api.spoonacular.com/recipes/random",
          {
            params: {
              number: 100,
              includeNutrition: false,
              apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 && Array.isArray(response.data.recipes)) {
          setRecipes(response.data.recipes);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: response.data.recipes,
              timestamp: Date.now(),
            })
          );
        } else {
          console.error("Unexpected API response:", response.data);
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    // Check localStorage for cached data
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);

      if (Date.now() - timestamp < CACHE_EXPIRATION) {
        setRecipes(data);
        setLoading(false);
        return;
      }
    }

    fetchRecipes();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <div className="bg-beige min-h-screen p-6 mt-12 no-scrollbar">
      <div className="my-14 text-center mx-auto max-w-2xl motion-preset-slide-right motion-duration-2000">
        <h1 className="text-5xl font-oleo font-bold text-darkblue border-b-4 border-orange py-4 inline-block">
          Recipes
        </h1>
        <p className="text-darkblue text-lg mt-4 font-marko">
          Here, you'll find a selection of delicious, handpicked recipes to
          explore and enjoy. Whether you're looking for a quick meal or
          something special, there's plenty to discover.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner className="h-12 w-12 text-orange" />
        </div>
      ) : recipes.length > 0 ? (
        <>
          {/* Recipe Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 motion-preset-slide-right motion-duration-2000">
            {currentRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id || index} recipe={recipe} />
            ))}
          </div>

          {/* Pagination Component */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p className="text-center text-red-500">No recipes found.</p>
      )}
    </div>
  );
};

export default Recipes;
