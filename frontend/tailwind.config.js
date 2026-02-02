/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        compliant: '#10b981',
        'non-compliant': '#ef4444',
        'unable-to-verify': '#f59e0b',
      },
    },
  },
  plugins: [],
};
