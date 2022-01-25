module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container:{
      center: true,
    },
    extend: {
      colors: {
        primary: "#ff4800",
        secondary: "#5C84DA"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
