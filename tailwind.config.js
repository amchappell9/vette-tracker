const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      red: {
        50: "#FFE3E3",
        100: "#FFBDBD",
        200: "#FF9B9B",
        300: "#F86A6A",
        400: "#EF4E4E",
        500: "#E12D39",
        600: "#CF1124",
        700: "#AB091E",
        800: "#8A041A",
        900: "#610316",
      },
      gray: colors.stone,
      yellow: colors.amber,
      green: colors.green,
      white: "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
};
