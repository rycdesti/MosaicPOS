/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}", "./node_modules/flowbite/**/*.{html,js,vue}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '868px',
      'lg': '1120px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
