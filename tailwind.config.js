/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#f43f5e', // coral / rose accent
          600: '#e11d48',
          700: '#be123c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        'vinyl': '0 20px 30px -10px rgba(0, 0, 0, 0.3), 0 10px 15px -5px rgba(0, 0, 0, 0.1)',
        'sleeve': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
