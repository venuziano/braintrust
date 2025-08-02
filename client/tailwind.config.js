/** @type {import('tailwindcss').Config} */
const shadcnPlugin = require('@shadcn/ui/plugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // no manual colors: CSS variables from shadcn are used
    },
  },
  plugins: [
    shadcnPlugin,
    require('tailwindcss-animate'),
  ],
};
  