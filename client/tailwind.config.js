/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      GreenishYellow: "#CBFC01",
    },
    fontFamily: {
      teko: ["Teko", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        GreenishYellow: "#CBFC01",
        ViolentViolet: "#351F60",
        DeepRose: "#D2386D",
        HokiCl: "#6C7FA7",
        Mercury: "#E4E5E7",
        DarkBg: "#1B2436",
        RhinoBlue: "#23336C",
        NightBlack: "#1B2436",
        Ceramic: "#FFFFFF",
        CarbonGrey: "#606060",
        PastelGrey: "#CDCBCB",
        DarkGrey: "#222222",
      },
    },
    screens: {
      '3xl': '1930px',
    },
  },
  plugins: [require("daisyui"), require('tailwind-scrollbar')],
});
