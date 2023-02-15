/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#F2F2F2',
          200: '#D9D9D9',
          300: '#808080',
          400: '#333333',
          500: '#262626',
          600: '#1A1A1A',
          700: '#0D0D0D',
        },
        blue: {
          base: '#4EA8DE',
          dark: '#1E6F9F',
        },
        purple: {
          base: '#8284FA',
          dark: '#5E60CE',
        },
        red: {
          300: '#E25858',
        },
      },
      boxShadow: {
        '1xl': '0 0 0 1px',
      },
      backgroundImage: {
        checked: "url('../assets/checked.svg')",
      },
    },
  },
  plugins: [],
}
