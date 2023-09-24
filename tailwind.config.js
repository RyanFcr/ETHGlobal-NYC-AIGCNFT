/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'blue': '#1432D1',
      'lightBlue': '#CBE9FF',
      'white': '#ffffff',
      'whitebg': '#E9ECEC',
      'black': '#000000',
      'black06': ' rgba(3, 3, 3, 0.06)',
      'black35': '#00000035',
      'black47': 'rgba(3, 3, 3, 0.47)',
      'black80': 'rgba(0, 0, 0, 0.8)',
      'red': '#FF0000',
      'green': '#35C254',
      'zong': '#782B00',
      'yellow': '#FF9900',
      'yellow36': '#FFA80036',
      'pink': '#EBCCCC'
    },
    fontFamily: {
      regular: 'AlibabaSans-Medium',
      bolder: 'AlibabaSans-Black'
    },
    animation: {
      'float': 'float 3s ease-out infinite',
      'scrollX': 'scrollX 24s linear infinite',
      'scrollX_2': 'scrollX_2 10s ease-in-out infinite alternate',
      'rotate': 'rotate 5s linear infinite',
    },
    keyframes: {
      float: {
        '0%': {
          transform: 'translateY(0px)'
        },
        '5%': {
          transform: 'translateY(-2px) scale(1.2)'
        },
        '25%': {
          transform: 'translateY(-10px) scale(1.2)'
        },
        '75%': {
          transform: 'translateY(10px) scale(1.2)'
        },
        '100%': {
          transform: 'translateY(0px) scale(1.2)'
        }
      },
      scrollX: {
        '0%': {
          transform: 'translateX(0)'
        },
        '100%': {
          transform: 'translateX(-100vw)'
        }
      },
      scrollX_2: {
        '0%': {
          transform: 'translateX(0)'
        },
        '100%': {
          transform: 'translateX(-25%)'
        }
      },
      rotate: {
        '0%': {
          transform: 'rotate(0)'
        },
        '100%': {
          transform: 'rotate(1turn)'
        }
      }
    },
    extend: {
    },
  },
  plugins: [require("daisyui")],
}
