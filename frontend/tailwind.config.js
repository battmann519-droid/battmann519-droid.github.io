module.exports = {
  content: [
    './src/app/**/*.{ts,tsx,js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mma: {
          50: '#f5f7ff',
          100: '#e6eefc',
          500: '#1f2937'
        }
      }
    }
  },
  plugins: [],
}
