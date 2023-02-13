/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        thBlue: "#35EEED",
        thOrange: "#F9A23F",
        thPurple: "#ED02FF",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
