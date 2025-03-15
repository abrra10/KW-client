import React, { useEffect, useRef, useState } from "react";
import RecipeForm from "../components/RecipeForm";
import RecipeDisplay from "../components/RecipeDisplay";
import HeroSection from "../UI/Hero";

export default function Home() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isMessageDisplayed, setIsMessageDisplayed] = useState(true); // Pre-submit message
  let eventSourceRef = useRef(null);

  useEffect(() => {
    closeEventStream(); // Close any existing connection
  }, []);

  useEffect(() => {
    if (recipeData) {
      closeEventStream(); // Close any existing connection
      initializeEventStream(); // Open a new connection
    }
  }, [recipeData]);

  const initializeEventStream = () => {
    const recipeInputs = { ...recipeData };
    const queryParams = new URLSearchParams(recipeInputs).toString();
    const API_URL =
      import.meta.env.VITE_API_URL || "https://kw-server-1.onrender.com";
    const url = `${API_URL}/recipeStream?${queryParams}`;
    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onopen = () => {
      console.log("SSE connection opened");
      setIsLoading(true); // Set loading when the connection opens
    };

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.action === "close") {
        closeEventStream();
        setIsLoading(false); // Stop loading once the stream closes
      } else if (data.action === "chunk") {
        setRecipeText((prev) => prev + data.chunk);
      }
    };

    eventSourceRef.current.onerror = (err) => {
      console.error("SSE connection error:", err);
      setError("Failed to load recipe");
      closeEventStream();
      setIsLoading(false); // Stop loading on error
    };
  };

  const closeEventStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  const onSubmit = (data) => {
    setRecipeText("");
    setError(null);
    setRecipeData(data);
    setIsLoading(true); // Set loading immediately
    setIsMessageDisplayed(false); // Hide message after submit
  };

  return (
    <section className="my-10 bg-beige no-scrollbar">
      <HeroSection />

      <div className="flex items-center gap-4 w-full text-center mb-8">
        <div className="flex-1 border-t-4 border-orange"></div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-oleo text-darkblue opacity-80 whitespace-normal md:whitespace-nowrap motion-preset-shrink motion-duration-1000">
          Start the <span className="text-orange">Magic</span> in Your Kitchen{" "}
          <span className="text-orange">Now</span>
        </h1>

        <div className="flex-1 border-t-4 border-orange"></div>
      </div>

      <div className="flex flex-col md:flex-row h-full gap-4 md:gap-8 justify-center py-4 px-4 motion-preset-shrink motion-duration-1000">
        <RecipeForm onSubmit={onSubmit} />

        <RecipeDisplay
          recipeText={recipeText}
          error={error}
          isLoading={isLoading}
          isMessageDisplayed={isMessageDisplayed}
        />
      </div>
    </section>
  );
}
