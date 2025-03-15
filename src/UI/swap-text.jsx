import { useState } from "react";

// Utility to join classes conditionally
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function SwapText({
  initialText,
  finalText,
  className = "",
  supportsHover = true,
  textClassName = "",
  initialTextClassName = "",
  finalTextClassName = "",
  disableClick = false,
  ...props
}) {
  const [active, setActive] = useState(false);
  const common = "block transition-all duration-500 ease-in-out"; // Adjusted duration for smoother transitions

  return (
    <div
      {...props}
      className={cn("relative overflow-hidden text-foreground", className)}
    >
      <div
        className={cn(
          "group cursor-pointer select-none text-3xl font-bold",
          textClassName
        )}
        onClick={() => !disableClick && setActive((current) => !current)}
      >
        {/* Initial Text (Title) */}
        <span
          className={cn(common, initialTextClassName, {
            "opacity-100": !active, // Ensure the title is visible when not active
            "opacity-0": active, // Make the title invisible when active
            "group-hover:opacity-0": supportsHover, // Hide on hover
            "translate-y-0": !active, // Stay in position when not active
            "group-hover:-translate-y-12": supportsHover, // Move title up on hover
          })}
        >
          {initialText}
        </span>

        {/* Final Text (Ready Time and Servings) */}
        <span
          className={cn(common, finalTextClassName, {
            "opacity-0": !active, // Initially hidden
            "opacity-100": active, // Make visible when active
            "group-hover:opacity-100": supportsHover, // Make visible on hover
            "translate-y-full": !active, // Position off-screen initially
            "group-hover:translate-y-0": supportsHover, // Slide final text in on hover
          })}
        >
          {finalText}
        </span>
      </div>
    </div>
  );
}
