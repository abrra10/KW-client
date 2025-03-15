import React, { useState } from "react";
import SwipeButton from "../UI/SwipeButton";

const RecipeForm = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [complexity, setComplexity] = useState("");
  const [focused, setFocused] = useState({
    ingredients: false,
    cuisine: false,
  });

  const handleSubmit = () => {
    const recipeData = {
      ingredients,
      mealType,
      cuisine,
      cookingTime,
      complexity,
    };
    onSubmit(recipeData);
  };

  // Function to determine if label should float
  const getFloatingLabelClass = (value, focused) => {
    return value || focused ? "transform -translate-y-7 scale-75" : "";
  };

  return (
    <div className="w-96 rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-lg bg-darkblue font-marko">
      <div className="px-6 py-8">
        {/* Ingredients Input */}
        <div className="mb-6 relative mt-2 py-1">
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onFocus={() =>
              setFocused((prev) => ({ ...prev, ingredients: true }))
            }
            onBlur={() =>
              setFocused((prev) => ({ ...prev, ingredients: false }))
            }
            className="peer w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder=" " // Empty placeholder to allow floating label
          />
          <label
            htmlFor="ingredients"
            className={`absolute left-3 top-2 text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-orange ${getFloatingLabelClass(
              ingredients,
              focused.ingredients
            )}`}
          >
            Ingredients
          </label>
        </div>

        {/* Cuisine Preference Input */}
        <div className="mb-2 relative mt-2 py-2">
          <input
            type="text"
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            onFocus={() => setFocused((prev) => ({ ...prev, cuisine: true }))}
            onBlur={() => setFocused((prev) => ({ ...prev, cuisine: false }))}
            className="peer w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder=" " // Empty placeholder to allow floating label
          />
          <label
            htmlFor="cuisine"
            className={`absolute left-3 top-2 text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3 peer-placeholder-shown:text- peer-focus:top-2 peer-focus:text-orange ${getFloatingLabelClass(
              cuisine,
              focused.cuisine
            )}`}
          >
            Cuisine Preference
          </label>
        </div>

        {/* Meal Type Segmented Control */}
        <div className="mb-2">
          <label className="block text-darkblue text-base md:text-lg font-bold mb-2">
            Meal Type
          </label>
          <div className="flex bg-white dark:bg-gray-800 border dark:border-gray-600 shadow-md rounded-xl overflow-hidden">
            {["Breakfast", "Lunch", "Dinner", "Snack"].map((type) => (
              <button
                key={type}
                onClick={() => setMealType(type)}
                className={`flex-1 py-2 text-sm font-medium text-darkblue transition-all ${
                  mealType === type
                    ? "bg-gradient-to-r from-orange to-orange text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Segmented Control */}
        <div className="mb-2">
          <label className="block text-darkblue text-base md:text-lg font-bold mb-2">
            Complexity
          </label>
          <div className="flex bg-white dark:bg-gray-800 border dark:border-gray-600 shadow-md rounded-xl overflow-hidden">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setComplexity(level)}
                className={`flex-1 py-2 text-sm font-medium text-darkblue transition-all ${
                  complexity === level
                    ? "bg-gradient-to-r from-orange to-orange text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Cooking Time Segmented Control */}
        <div className="mb-2">
          <label className="block text-darkblue text-base md:text-lg font-bold mb-2">
            Cooking Time
          </label>
          <div className="flex bg-white dark:bg-gray-800 border dark:border-gray-600 shadow-md rounded-xl overflow-hidden">
            {["Less than 30 minutes", "30-60 minutes", "More than 1 hour"].map(
              (time) => (
                <button
                  key={time}
                  onClick={() => setCookingTime(time)}
                  className={`flex-1 py-2 text-sm px-1 font-medium text-darkblue transition-all ${
                    cookingTime === time
                      ? "bg-gradient-to-r from-orange to-orange text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {time}
                </button>
              )
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-14 text-center">
          <SwipeButton
            className="bg-orange text-white w-full font-bold py-2 font-marko rounded-md focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Generate Recipe
          </SwipeButton>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
