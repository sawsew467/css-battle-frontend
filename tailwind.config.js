/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'slider': "var(--sliderWidth)",
      },
      colors: {
        "primary": "#ffdf00"
      }
    },
  },
  plugins: [],
}

