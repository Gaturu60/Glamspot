module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg": "url('/images/istockphoto-1261155521-612x612.jpg')",
      },
      colors: {
        primary: "#6b5b9a",
        secondary: "#ff8c94",
      },
    },
  },
  plugins: [],
};
