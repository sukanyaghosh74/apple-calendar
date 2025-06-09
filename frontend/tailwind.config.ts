import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: '#4F8CFF', // Dayli blue
        accent: '#A259FF',  // Dayli purple
        background: '#F9FAFB',
        card: '#FFFFFF',
        muted: '#F3F4F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(80, 112, 255, 0.08)',
      },
      borderRadius: {
        xl: '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}
export default config 