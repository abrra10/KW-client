import { ArrowRight } from "lucide-react";
import { cn } from "../utils/utils"; // Update this path if needed

export default function SignInBtn({ text = "Get Started", className }) {
  return (
    <div className="min-h-10 w-full max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem] lg:max-w-[14rem]">
      <button
        className={`${cn(
          "group flex h-10 w-full items-center justify-center gap-2 rounded-md bg-ybrown p-1.5 font-bold transition-colors duration-100 ease-in-out hover:bg-orange",
          "sm:h-9 sm:w-28 md:h-10 md:w-32 lg:h-11 lg:w-40", // Smaller sizes
          className
        )}`}
      >
        <span
          className={`${cn(
            "text-orange transition-colors duration-100 ease-in-out group-hover:text-ybrown",
            "text-xs sm:text-xs md:text-sm lg:text-sm" // Adjust text size
          )}`}
        >
          {text}
        </span>
        <div
          className={`${cn(
            "relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-full transition-transform duration-100",
            "bg-orange group-hover:bg-ybrown"
          )}`}
        >
          <div className="absolute left-0 flex h-5 w-10 -translate-x-1/2 items-center justify-center transition-all duration-200 ease-in-out group-hover:translate-x-0">
            <ArrowRight
              size={22}
              className={`${cn(
                "transform p-0.5 text-orange-600 opacity-0 group-hover:opacity-100"
              )}`}
            />
            <ArrowRight
              size={22}
              className={`${cn(
                "transform p-0.5 text-ybrown opacity-100 transition-transform duration-300 ease-in-out group-hover:opacity-0"
              )}`}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
