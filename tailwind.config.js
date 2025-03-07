module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
      extend: {
        colors: {
          emerald: {
            50: '#ecfdf5',
            100: '#d1fae5',
            600: '#059669',
            700: '#047857',
          },
        },
      },
    },
    plugins: [],
  }