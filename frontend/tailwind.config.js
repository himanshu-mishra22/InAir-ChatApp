/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        30: '7.5rem',
        35: '8.5rem',
        44: '10rem',
        72: '18rem',
        80: '20rem'
      }
    },
  },
  plugins: [],
}