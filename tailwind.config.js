/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'autolease-pattern': "url('./assets/Autolease Desktop.png')",
      },
      colors: {
        autoCream: '#FDFDE5',
        autoPurple: '#36454F',
        autoCreamDark:"#3D3D3D"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
