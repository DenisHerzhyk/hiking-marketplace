/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        desktop: "1921px",
        laptop: "1367px",
        tablet: "769px",
        mobile: "361px",
      },
    },
  },
  plugins: [],
};
