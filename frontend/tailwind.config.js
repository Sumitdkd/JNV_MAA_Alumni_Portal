const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#1E3A8A',     // Royal Blue
        accent: '#A7F3D0',      // Mint Green
        secondary: '#FCD34D',   // Soft Yellow
        contrast: '#0F172A',    // Deep Navy
        surface: '#FFFFFF',
        background: '#F9FAFB',
        muted: '#94A3B8',
        'on-surface': '#1F2937',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
