import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          '950': '#030712',
          '900': '#0f172a',
          '800': '#1e293b',
          '700': '#334155',
          '600': '#475569',
          '500': '#64748b',
          '400': '#94a3b8',
          '300': '#cbd5e1',
          '200': '#e2e8f0',
          '100': '#f1f5f9',
          '50': '#f8fafc',
        },
        cyan: {
          '50': '#ecf8fb',
          '100': '#cff0f8',
          '500': '#06b6d4',
          '600': '#0891b2',
          '700': '#0e7490',
        },
        orange: {
          '50': '#fff7ed',
          '100': '#ffedd5',
          '500': '#f97316',
          '600': '#ea580c',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        // Typography scale for readability
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      letterSpacing: {
        'tight': '-0.01em',
        'normal': '0em',
        'wide': '0.025em',
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'standard': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
      },
    },
  },
  plugins: [],
};

export default config;
