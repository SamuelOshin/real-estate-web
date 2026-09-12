const tokens = require("./src/config/theme.tokens.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: tokens.fontFamily,
      fontSize: tokens.fontSize,
      borderRadius: tokens.borderRadius,
      spacing: tokens.spacing,
      boxShadow: tokens.boxShadow,
      maxWidth: {
        container: "80rem",
      },
    },
  },
  plugins: [],
};
