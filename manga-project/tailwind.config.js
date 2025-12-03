/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ← TAMBAH INI
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0a0a0a',
          card: '#1a1a1a',
          accent: '#ff4757',
        }
      },
      backgroundImage: {
        'login-bg': "url('https://wallpapercave.com/wp/wp5257135.jpg')",
      }
    },
  },
  plugins: [],
}