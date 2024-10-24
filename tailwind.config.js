/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,tsx,ts,jsx}",
    "./src/app/**/*.{js,tsx,ts,jsx}",
    "./src/app/(**)/*.{js,tsx,ts,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
