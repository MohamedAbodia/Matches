module.exports = {
  darkMode: 'class',

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },

    screens: {
      '4xs': '320px',
      '3xs': '400px',
      '2xs': '480px',
      xs: '560px',
      sm: '640px',
      md: '896px',
    },

    extend: {
      colors: {
        blue: {
          100: '#B9C1CF',
          200: '#94D1E0',
          300: '#00596F',
          400: '#454D58',
          500: '#2B3038',
          600: '#13171A',
        },
        gray: { 100: '#E8E8E8', 200: '#D0D0D0', 300: '#4C4C4C' },
        white: '#FFFFFF',
      },

      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
    },
  },

  plugins: [require('@tailwindcss/line-clamp')],
};
