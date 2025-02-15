/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/**/src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        accent: 'var(--accent-color)',
        success: 'var(--success-color)',
        warn: 'var(--warn-color)',
      },
    },
  },
  plugins: [],
}

