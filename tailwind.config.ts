import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0e0e0e',
          surface: '#161616',
          card: '#1c1c1c',
          footer: '#111111',
        },
        accent: {
          DEFAULT: '#b89b6a',
          dark: '#8a7249',
          wa: '#1a3a1f',
          waFg: '#a8d5b0',
        },
        brand: {
          primary: '#e8e0d4',
          muted: '#7a7166',
          inverse: '#0e0e0e',
        },
        divider: '#242424',
        border: '#2a2a2a',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
