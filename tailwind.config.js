/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:
      {
        'table-web': '7% 12% 10% 15% 15% 7% 7% 13% 9% 5%',
        'table-mobile': '33% 33% 34%',
      }
    },
  },
  plugins: [],
}