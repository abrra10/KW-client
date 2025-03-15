import { Bookmark, Sparkles, Users } from "lucide-react";
import { LuFileHeart } from "react-icons/lu";
import { LuTheater } from "react-icons/lu";

const features = [
  {
    title: "AI-Powered Recipe Generator",
    description:
      "Create unique recipes in seconds with our powerful AI. Simply input your ingredients and let the magic happen!",
    icon: <Sparkles className="text-orange-500 w-12 h-12" />,
  },
  {
    title: "Save & Download Recipes",
    description:
      "Save your favorite AI-generated recipes to your account and download them as PDFs for quick access anytime.",
    icon: <LuFileHeart className="text-orange-500 w-12 h-12" />,
  },
  {
    title: "Discover & Share",
    description:
      "Explore a wide range of recipes or dive into our blog community to share your cooking tips and food stories.",
    icon: <LuTheater className="text-orange-500 w-12 h-12" />,
  },
];

export default function Features() {
  return (
    <section className="py-6 px-10 bg-beige">
      <div className="container mx-auto px-6 text-center">
        {/* <h2 className="text-3xl md:text-4xl font-extrabold font-oleo text-darkblue mt-4">
          With Our App
        </h2> */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 border-t-4 border-orange"></div>
          <p className="max-w-lg text-darkblue font-marko font-bold text-xl text-center motion-preset-slide-right motion-duration-2000">
            Explore a world of flavors with AI-powered recipe ideas,
            community-driven food blogs, and a touch of culinary inspiration.
            Whether you're looking for new dishes, sharing your own creations,
            or just browsing for fun, we've got something for every food lover!
          </p>
          <div className="w-10 border-t-4 border-orange"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg motion-preset-slide-right motion-duration-2000"
            >
              <div className="flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-ybrown text-darkblue text-3xl">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mt-4 font-marko text-orange">
                {feature.title}
              </h3>
              <p className="font-bold font-marko mt-2 text-darkblue">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
