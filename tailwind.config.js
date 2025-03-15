/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/animata/**/*.js", // Includes Animata components
  ],
  theme: {
    extend: {
      colors: {
        beige: "#FFEA82",
        byellow: "#FFBF00",
        orange: "#FF9933",
        ybrown: "#FFD466",
        darkblue: "#003049",
        foreground: "hsl(var(--foreground))", // Added foreground color for SwapText
      },
      transitionTimingFunction: {
        slow: "cubic-bezier(.405, 0, .025, 1)", // Added slow timing function for SwapText
        "minor-spring": "cubic-bezier(0.18,0.89,0.82,1.04)", // Added spring timing function for SwapText
      },
      fontFamily: {
        cagliostro: ["Cagliostro", "serif"],
        oleo: ["Oleo Script", "serif"],
        marko: ["Marko One", "serif"],
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(315deg, #ffea82 24%, #ff9933 100%)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        "html, body, .no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        "html::-webkit-scrollbar, body::-webkit-scrollbar, .no-scrollbar::-webkit-scrollbar":
          {
            display: "none",
          },
      });
    },
    require("tailwindcss-motion"),
  ],
};
