/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#d9e9ff',
          200: '#b6d5ff',
          300: '#89bbff',
          400: '#5e9dff',
          500: '#3b7eff',
          600: '#2b60f0',
          700: '#234bd0',
          800: '#1f3fa8',
          900: '#1c367f'
        }
      }
    }
  },
  plugins: []
}


