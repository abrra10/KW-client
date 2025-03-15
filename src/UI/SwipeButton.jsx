import React from "react";

function SwipeButton({
  className = "",
  secondText = "Generate recipe",
  firstText = "Generate recipe",
  firstClass = "bg-orange-500 text-white",
  secondClass = "bg-ybrown text-darkblue",
  ...props
}) {
  const common =
    "block px-2 py-3 text-xl font-bold duration-300 ease-in-out absolute inset-0 flex items-center justify-center";

  return (
    <button
      {...props}
      className={`group relative min-w-fit overflow-hidden rounded-md ${className}`}
      style={{ height: "50px" }} // You can adjust the height here as needed
    >
      <span
        className={`translate-y-full group-hover:translate-y-0 ${common} ${secondClass}`}
      >
        {secondText}
      </span>
      <span className={`group-hover:-translate-y-full ${common} ${firstClass}`}>
        {firstText}
      </span>
    </button>
  );
}

export default SwipeButton;
