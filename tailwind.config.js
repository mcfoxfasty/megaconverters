/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6366F1',
        'primary-hover': '#4F46E5',
        'dark-bg': '#0F172A',
        'dark-card': '#1E293B',
        'dark-border': '#334155',
        'light-text': '#F1F5F9',
        'medium-text': '#94A3B8',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
