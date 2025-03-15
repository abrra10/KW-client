import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import supabase from "../utils/supabaseClient";
import SavedRecipesCard from "./SavedRecipesCard";

const SavedRecipes = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchRecipes = async () => {
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;
        setRecipes(data || []);
      } catch (err) {
        setError(`Error fetching recipes: ${err.message}`);
      }
    };

    fetchRecipes();
  }, [user?.id]);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .match({ id, user_id: user.id }); // Ensure it deletes only for the current user

      if (error) throw error;

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
    } catch (err) {
      setError(`Error deleting recipe: ${err.message}`);
    }
  };

  return (
    <div className="p-6 no-scrollbar">
      <h1 className="text-4xl font-extrabold font-marko text-darkblue mb-6">
        Saved Recipes
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {recipes.length === 0 ? (
        <p className="text-center text-gray-600">No saved recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map(({ id, title, ingredients, instructions }) => (
            <SavedRecipesCard
              key={id}
              id={id}
              title={title}
              ingredients={ingredients}
              instructions={instructions}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
