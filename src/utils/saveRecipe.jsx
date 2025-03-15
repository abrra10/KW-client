import { toast } from "react-toastify";
import supabase from "../utils/supabaseClient";

const saveRecipe = async (recipe) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Error fetching user:", authError);
    toast.error("Failed to authenticate. Please try again.");
    return;
  }

  if (!user) {
    toast.error("You must be logged in to save recipes.");
    return;
  }

  const { data, error } = await supabase.from("recipes").insert({
    user_id: user.id,
    title: recipe.title,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
  });

  if (error) {
    console.error("Error saving recipe:", error);
    toast.error("Failed to save recipe.");
  } else {
    toast.success("Recipe saved successfully!");
  }
};

export default saveRecipe;
