module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#ff9933',
        deeporange: '#ff6600',
        warmgold: '#ffd18c',
        kolambg: '#fff8f2',
        kolamtext: '#3e2723'
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft-orange': '0 8px 24px rgba(255,153,51,0.12)'
      }
    }
  },
  plugins: [],
}
