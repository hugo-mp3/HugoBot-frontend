/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        17: "6.5rem",
      },
      height: {
        sm: "calc(100vh - 30rem)", // For small screens
        md: "calc(100vh - 30rem)", // For medium screens
        lg: "calc(100vh - 30rem)", // For large screens
      },
    },
    screens: {
      sm: "300px",
      md: "800px",
      lg: "1250px",
    },
  },
  plugins: [],
};
