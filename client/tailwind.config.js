/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tmpBlue: "#4093fb",
        tmpBlack: '#1b1f23',
        tmplightBlack: '#292f35'
      },
      fontFamily: {
        tmpfont: ["Work Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}

