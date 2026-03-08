/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulse_soft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        gradient_shift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        sparkle_spin: {
          '0%': { transform: 'rotate(0deg) scale(0)', opacity: '1' },
          '50%': { transform: 'rotate(180deg) scale(1)', opacity: '1' },
          '100%': { transform: 'rotate(360deg) scale(0)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulse_soft: 'pulse_soft 2s ease-in-out infinite',
        gradient_shift: 'gradient_shift 8s ease infinite',
        sparkle_spin: 'sparkle_spin 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
