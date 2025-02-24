/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        web: "1320px",
      },
      animation: {
        blink: "blink-caret 0.7s step-end infinite",
      },
      keyframes: {
        "blink-caret": {
          "50%": { borderColor: "transparent" },
        },
      },
    },
  },
  plugins: [],
};
