/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#12181B",
        "dark-hovered": "#1b2428",
      },
      keyframes: {
        "fade-out": {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
        "fade-in": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
