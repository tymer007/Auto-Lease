/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        autoCream: '#FDFDE5',
        autoPurple: '#510489',
        autoCreamDark:"#3D3D3D"
      },
    },
  },
  plugins: [],
};
