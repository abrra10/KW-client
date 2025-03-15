import React from "react";

export default function LoadingSpinner({
  className,
  outerSize = "h-8 w-8",
  childSize = "h-6 w-6",
}) {
  return (
    <div
      className={`m-2 animate-spin items-center justify-center rounded-full bg-gradient-to-bl from-orange to-red-600 p-0.5 z-50 ${className} ${outerSize}`}
    >
      <div className={`rounded-full bg-beige ${childSize}`} />
    </div>
  );
}
