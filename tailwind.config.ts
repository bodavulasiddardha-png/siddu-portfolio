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
        amber: {
          DEFAULT: '#ffa538',
          bright: '#ffc978',
          dim: '#b5691a',
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
          'linear-gradient(to bottom, transparent, rgba(5,6,11,1)), radial-gradient(ellipse at top, rgba(255,165,56,0.16), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(255,165,56,0.35)',
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
