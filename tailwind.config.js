/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
     colors: {
      'blue': '#2D60FF',
      'red': '#FE5C73',
      'grey': '#F5F7FA',
      'darkblue': '#343C6A',
      'textgrey': '#B1B1B1',
      'darkbg': '#0D1321',
      'darkbg2': '#0d1321fb'
     }
    },
  },
  plugins: [],
}