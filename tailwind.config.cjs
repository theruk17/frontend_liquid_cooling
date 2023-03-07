/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom_red1': '#e30000',
        'custom_red2': '#fd4242',
      },
      aspectRatio: {
        '4/3': '1 / 1'
      }
    },
  },
  plugins: [],
}
