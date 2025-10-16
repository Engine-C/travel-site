/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E88E5',
        accent: '#43A047',
        lightblue: '#E3F2FD',
        lightgreen: '#E8F5E9'
      }
    }
  },
  plugins: []
}


