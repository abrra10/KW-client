import { FaTrash } from "react-icons/fa";

const SavedRecipesCard = ({
  id,
  title,
  ingredients,
  instructions,
  onDelete,
}) => {
  const formatIngredientsAsPills = (text) =>
    text?.split("*").map((item, index) =>
      item.trim() ? (
        <span
          key={index}
          className="bg-orange text-darkblue px-2 py-1 rounded-full text-xs sm:text-sm md:text-base"
        >
          {item.trim()}
        </span>
      ) : null
    );

  const formatSteps = (text) =>
    text
      ?.split(/\d+\.\s/)
      .filter((step) => step.trim())
      .map((step, index) => (
        <p key={index} className="text-gray-700 text-sm sm:text-base">
          <strong className="text-orange-500">{index + 1}.</strong>{" "}
          {step.trim()}
        </p>
      ));

  return (
    <div className="bg-ybrown p-3 sm:p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col gap-3 w-full max-w-4xl">
      {/* Title Section */}
      <div className="flex items-center justify-between border-b-2 border-orange pb-1">
        <h2 className="font-bold font-marko text-darkblue text-lg sm:text-xl md:text-2xl flex items-center gap-2">
          {title}
        </h2>
        <button
          onClick={() => onDelete(id)}
          className="text-darkblue transition hover:text-red-500"
        >
          <FaTrash size={18} />
        </button>
      </div>

      {/* Ingredients Section */}
      <div className="font-marko text-darkblue text-sm sm:text-base">
        <h3 className="font-semibold">Ingredients:</h3>
        <div className="flex flex-wrap justify-start gap-1 sm:gap-2 mt-1">
          {formatIngredientsAsPills(ingredients)}
        </div>
      </div>

      {/* Steps Section */}
      <div className="font-marko text-darkblue text-sm sm:text-base">
        <h3 className="font-semibold">Steps:</h3>
        <div className="space-y-1 mt-1">{formatSteps(instructions)}</div>
      </div>
    </div>
  );
};

export default SavedRecipesCard;
