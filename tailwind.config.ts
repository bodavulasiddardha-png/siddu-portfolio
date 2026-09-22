import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm near-black + a single sepia/gold accent family.
        bg: '#0a0806',
        'bg-soft': '#120e09',
        surface: '#171310',
        'surface-line': '#2b241a',
        ink: '#f5efe4',
        muted: '#a89a85',
        'muted-dim': '#6b5f4d',
        amber: {
          DEFAULT: '#d7b58c',
          bright: '#ecd8b4',
          dim: '#8c6f47',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, rgba(10,8,6,1)), radial-gradient(ellipse at top, rgba(215,181,140,0.14), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(215,181,140,0.3)',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
}
export default config
