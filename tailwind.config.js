/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      wordleGray: "#787c7e",
      wordleYellow: "#c9b360",
      wordleKeyBoard: "#d3d6da",
      wordleGreen: "#6ca969",
    },
    keyframes: {
      shake: {
        "0%, 100%": { transform: "translateX(0)" },
        "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
        "20%, 40%, 60%, 80%": { transform: "translateX(10px)" },
      },
      enlarge: {
        "0%, 100%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.1)" },
      },
    },
    animation: {
      shake: "shake 0.75s ease-in-out",
      enlarge: "enlarge 0.25s ease-in-out",
    },
  },
};
export const plugins = [];
