import React from "react";
import Features from "../components/features";

const HeroSection = ({ className }) => {
  const ingredients = [
    {
      emoji: "🍅",
      position:
        "group-hover:-rotate-[10deg] group-hover:-translate-y-12 lg:group-hover:-rotate-[10deg] lg:group-hover:-translate-y-12 md:-left-28 md:-top-1",
    },
    {
      emoji: "🥕",
      position:
        "group-hover:-rotate-[20deg] group-hover:-translate-x-10 lg:group-hover:-rotate-[20deg] lg:group-hover:-translate-x-10 md:-left-[135px] md:-top-2 ",
    },
    {
      emoji: "🧄",
      position:
        "group-hover:rotate-[10deg] group-hover:-translate-y-10 lg:group-hover:rotate-[10deg] lg:group-hover:-translate-y-10 md:left-[280px] md:-top-1",
    },
    {
      emoji: "🥬",
      position:
        "group-hover:rotate-[20deg] group-hover:translate-x-16 lg:group-hover:rotate-[20deg] lg:group-hover:translate-x-16 md:left-[280px] md:-top-4 ",
    },
  ];

  const dishes = [
    {
      emoji: "🍳",
      position:
        "group-hover:-translate-y-8 lg:group-hover:-translate-y-8 md:-left-20 md:-top-12",
    },
    {
      emoji: "🍣",
      position:
        "group-hover:-rotate-45 lg:group-hover:-rotate-45 md:-left-36 md:-top-1 ",
    },
    {
      emoji: "🥗",
      position:
        "rotate-[30deg] lg:rotate-[30deg] md:left-[260px] md:-top-[90px]",
    },
    {
      emoji: "🍩",
      position:
        "group-hover:rotate-[45deg] lg:group-hover:rotate-[45deg] md:left-[350px] md:-top-2",
    },
  ];

  return (
    <div
      className={`relative mt-[116px] mb-6 min-h-[100px] w-full bg-beige md:min-h-[200px] ${className} `}
    >
      <div className="mb-2 flex flex-col items-center justify-center gap-3">
        <div className="text-normal flex flex-col items-center justify-center p-5 font-bold sm:text-xl md:text-4xl font-oleo motion-preset-shrink motion-duration-1000">
          <div className="flex items-center justify-center gap-1">
            <span className="text-darkblue opacity-80 text-3xl md:text-5xl">
              Create
            </span>
            <div className="group relative flex items-center">
              <span className="text-orange group-hover:text-green-400 text-3xl md:text-5xl">
                Delicious Recipes
              </span>
              <div className="duration-400 absolute inset-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100">
                {ingredients.map((item, index) => (
                  <span
                    key={index}
                    className={`pointer-events-none absolute transform text-lg transition-transform duration-500 group-hover:scale-110 md:text-4xl ${item.position} sm:hidden md:block`}
                  >
                    {item.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            <span className="text-darkblue opacity-80 text-3xl md:text-5xl">
              and
            </span>
            <div className="group relative flex items-center">
              <span className="text-orange group-hover:text-red-600 text-3xl md:text-5xl">
                Savor the Flavors
              </span>
              <div className="duration-400 absolute inset-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100">
                {dishes.map((item, index) => (
                  <span
                    key={index}
                    className={`pointer-events-none absolute transform text-lg transition-transform duration-500 group-hover:scale-110 sm:text-2xl md:text-4xl ${item.position} sm:hidden md:block`}
                  >
                    {item.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Features />
      </div>
    </div>
  );
};

export default HeroSection;
