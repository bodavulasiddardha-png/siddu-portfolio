import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05060b',
        'bg-soft': '#0a0d18',
        surface: '#0f1220',
        'surface-line': '#1c2035',
        ink: '#f4f5fb',
        muted: '#9aa1c2',
        'muted-dim': '#5c6284',
        violet: {
          DEFAULT: '#8b6bff',
          bright: '#ab8fff',
          dim: '#5a3fc7',
        },
        cyan: {
          DEFAULT: '#3fe7d6',
          bright: '#7ef6e9',
          dim: '#1f8f83',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, rgba(5,6,11,1)), radial-gradient(ellipse at top, rgba(139,107,255,0.14), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(139,107,255,0.35)',
        'glow-cyan': '0 0 40px rgba(63,231,214,0.3)',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
}
export default config
