import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#FFD700',
          50: '#FFFEF7',
          100: '#FFFAEB',
          200: '#FFF2CC',
          300: '#FFE9AD',
          400: '#FFE08F',
          500: '#FFD700',
          600: '#E6C200',
          700: '#B8A000',
          800: '#8A7700',
          900: '#5C4E00',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        peach: {
          50: '#fef7f0',
          100: '#fdeee1',
          200: '#fbd5b5',
          300: '#f9bc89',
          400: '#f7a35d',
          500: '#f58a31',
          600: '#e6731e',
          700: '#b8591f',
          800: '#8a3f20',
          900: '#5c2521',
        },
        apricot: {
          50: '#fef5f0',
          100: '#fdebe1',
          200: '#fad1b5',
          300: '#f7b789',
          400: '#f49d5d',
          500: '#f18331',
          600: '#de6b1e',
          700: '#b15419',
          800: '#843d14',
          900: '#57260f',
        },
        coral: {
          50: '#fff5f5',
          100: '#ffebeb',
          200: '#ffcccc',
          300: '#ffadad',
          400: '#ff8e8e',
          500: '#ff6f6f',
          600: '#e65050',
          700: '#b83d3d',
          800: '#8a2a2a',
          900: '#5c1717',
        }
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;