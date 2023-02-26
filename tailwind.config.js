/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {},
  daisyui: {
    themes: ["cmyk"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
