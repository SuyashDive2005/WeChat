import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fffe",
          100: "#ccf4f0",
          200: "#99e9e1",
          300: "#66ddd2",
          400: "#33d2c3",
          500: "#00bcb4",
          600: "#009890",
          700: "#00746c",
          800: "#005048",
          900: "#002c24",
        },
        accent: {
          coral: "#FF6B6B",
          gold: "#FFB84D",
          purple: "#8E44AD",
          mint: "#2ECC71",
        },
        text: {
          dark: "#2D3748",
          medium: "#4A5568",
          light: "#718096",
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
  },
};
