/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
    fontFamily: {
      nunito: ['Nunito', 'sans-serif'],
    },
  },

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('daisyui'), require('tailwind-scrollbar')],
  daisyui: {
    themes: ['retro'],
  },
}
