module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#B657FF', // Light Purple for gradient start
        'gradient-end': '#FF995C', // Light Orange for gradient end
        'button-pink': '#D97BFF', // Pink for buttons
        'button-orange': '#FF995C', // Orange for buttons
        'dark-bg': '#100617', // Dark background
        'pink-to-black-start': '#FF4B8A', // Custom pink color for gradient start
        'pink-to-black-end': '#000000', // Black color for gradient end
      }
    },
  },
  plugins: [],
}
