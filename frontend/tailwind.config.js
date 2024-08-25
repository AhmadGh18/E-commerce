/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/Admin/*",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Nunito Sans", "san-serif"],
      },
      darkMode: "className",
    },
  },
  plugins: [],
};
