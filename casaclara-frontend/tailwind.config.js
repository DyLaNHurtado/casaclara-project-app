/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0078D4',
        secondary: '#2B88D8',
        accent: '#00B294',
        background: '#F3F2F1',
        surface: '#FFFFFF',
        text: '#323130',
      },
      fontFamily: {
        sans: ['Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}