/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
    "./shared/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        base: {
          white: "#FFFFFF",
          black: "#252525",
        },
        neutral: {
          100: "#F4F4F4",
          200: "#EFEFEF",
          300: "#DDDDDD",
          400: "#929292",
          500: "#838383",
          600: "#757575",
          700: "#6E6E6E",
          800: "#585858",
          900: "#333333",
        },
        primary: {
          100: "#e6e6f2",
          200: "#d9d9ec",
          300: "#bob1d7",
          400: "#00027d",
          500: "#000271",
          600: "#000264",
          700: "#00025e",
          800: "#000138",
          900: "#00012c",
        },
      },
    },
  },
  plugins: [],
};
