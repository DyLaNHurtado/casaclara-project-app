module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{vue,js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};