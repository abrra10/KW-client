import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiBookmark } from "react-icons/hi2";
import { jsPDF } from "jspdf";
import saveRecipe from "../utils/saveRecipe";
import { useAuth } from "../utils/AuthContext";
import LoadingSpinner from "../UI/LoadingSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const formatRecipeText = (text) => {
  return text
    .replace(/- Recipe Name: *?\n/, "") // Remove recipe name line completely
    .replace(/- Ingredients:/g, "\n\n- Ingredients:\n")
    .replace(/- Steps:/g, "\n\n- Steps:\n")
    .replace(/\* /g, "\n• ")
    .replace(/(\d\.)/g, "\n$1");
};

const extractRecipeParts = (text) => {
  const ingredientsIndex = text.indexOf("- Ingredients:");

  // Extract title correctly
  const title =
    ingredientsIndex !== -1
      ? text.substring(0, ingredientsIndex).trim() // Everything before "- Ingredients:" is the title
      : "Untitled Recipe";

  const stepsIndex = text.indexOf("- Steps:");

  const ingredients =
    ingredientsIndex !== -1 && stepsIndex !== -1
      ? text
          .substring(ingredientsIndex + "- Ingredients:".length, stepsIndex)
          .trim()
      : "No ingredients provided";

  const instructions =
    stepsIndex !== -1
      ? text.substring(stepsIndex + "- Steps:".length).trim()
      : "No steps provided";

  return { title, ingredients, instructions };
};

const RecipeDisplay = ({
  recipeText,
  error,
  isLoading,
  isMessageDisplayed,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [recipeText]);

  const handleSaveRecipe = () => {
    if (!user) {
      toast.error("You must be logged in to save the recipe!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/login");
      }, 3500);
      return;
    }

    const { title, ingredients, instructions } = extractRecipeParts(recipeText);
    saveRecipe({ title, ingredients, instructions }); // No need for another toast here
  };

  const handleDownloadPDF = () => {
    if (!recipeText) return;

    const { title, ingredients, instructions } = extractRecipeParts(recipeText);

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(title, 10, 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const margin = 10;
    const pageHeight = doc.internal.pageSize.height;
    let y = 20;

    const addTextWithWrapping = (text, startY) => {
      const splitText = doc.splitTextToSize(text, 180);
      splitText.forEach((line) => {
        if (y + 10 > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += 7;
      });
    };

    addTextWithWrapping("\n\nIngredients:\n" + ingredients, y);
    addTextWithWrapping("\n\nInstructions:\n" + instructions, y);

    doc.save(`${title}.pdf`);
  };

  return (
    <>
      <ToastContainer />
      <div
        ref={containerRef}
        className="relative w-96 h-[582px] p-4 px-6  text-center text-lg pt-16 font-bold text-orange bg-darkblue rounded-tl-3xl rounded-br-3xl shadow-xl overflow-y-auto whitespace-pre-line no-scrollbar font-oleo"
      >
        {recipeText && (
          <HiBookmark
            className="absolute top-4 right-4 text-orange hover:text-ybrown text-3xl cursor-pointer hover:text-orange-500 transition-colors"
            onClick={handleSaveRecipe}
          />
        )}

        {/* Loading Spinner */}
        {isLoading && !isMessageDisplayed && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner className="h-12 w-12 z-30" />
          </div>
        )}

        {/* Message when no recipe is entered */}
        {isMessageDisplayed && (
          <div className="flex items-center justify-center h-full text-center text-2xl font-extrabold leading-8">
            Please enter your recipe details and click generate
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="text-red-500">
            Failed to load recipe. Please try again.
          </div>
        )}

        {/* Recipe text and actions */}
        {!error && recipeText && !isLoading && (
          <div>
            {formatRecipeText(recipeText)}

            {/* Download PDF button moved inside the scrollable area */}
            <div className="mt-8 mb-3">
              <button
                onClick={handleDownloadPDF}
                className="bg-orange text-white w-full font-bold py-3 font-marko rounded-md "
              >
                Download as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeDisplay;
