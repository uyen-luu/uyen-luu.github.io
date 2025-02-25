/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
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
      colors: {
        second: "#27333f",
        primary: "#141a20",
      },
    },
  },
  plugins: [],
};
