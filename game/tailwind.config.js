/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'neon': 'neon 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        neon: {
          'from': { boxShadow: '0 0 10px rgba(249,115,22,0.5), 0 0 20px rgba(249,115,22,0.3)' },
          'to': { boxShadow: '0 0 20px rgba(249,115,22,0.8), 0 0 30px rgba(249,115,22,0.5)' },
        }
      }
    },
  },
  plugins: [],
}