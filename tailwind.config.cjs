/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom_dark: "#040404",
        water_green: "#808877",
        soft_green: "#377970",
        soft_red: "#fd543b",
        outline_red: "rgb(235 158 158 / 58%);"
      },
    },
  },
  plugins: [],
}