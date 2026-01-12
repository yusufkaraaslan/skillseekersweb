import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0f',
          surface: '#13131a',
          border: '#1f1f29',
          text: {
            primary: '#e8e8ee',
            secondary: '#a0a0b0',
          },
        },
        brand: {
          primary: '#6366f1', // Indigo-500
          secondary: '#8b5cf6', // Purple-500
          success: '#10b981', // Emerald-500
          warning: '#f59e0b', // Amber-500
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#a0a0b0',
            fontSize: '1.0625rem',
            lineHeight: '1.7',
            '.lead': {
              fontSize: '1.25rem',
              lineHeight: '1.8',
              marginTop: '1.25rem',
              marginBottom: '2.5rem',
              color: '#a0a0b0',
            },
            a: {
              color: '#6366f1',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#8b5cf6',
              },
            },
            strong: {
              color: '#e8e8ee',
              fontWeight: '600',
            },
            code: {
              color: '#8b5cf6',
              backgroundColor: '#13131a',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#13131a',
              border: '1px solid #1f1f29',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              borderRadius: '0',
              fontSize: 'inherit',
            },
            h1: {
              color: '#e8e8ee',
              fontWeight: '700',
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8888889em',
            },
            h2: {
              color: '#e8e8ee',
              fontWeight: '600',
              fontSize: '1.875em',
              marginTop: '4rem',
              marginBottom: '2rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid #1f1f29',
            },
            'h1 + h2': {
              marginTop: '2rem',
            },
            h3: {
              color: '#e8e8ee',
              fontWeight: '600',
              fontSize: '1.5em',
              marginTop: '3rem',
              marginBottom: '1.25rem',
            },
            h4: {
              color: '#e8e8ee',
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              lineHeight: '1.8',
            },
            'h2 + p, h3 + p, h4 + p': {
              marginTop: '0.75rem',
            },
            ul: {
              marginTop: '1.75rem',
              marginBottom: '1.75rem',
            },
            ol: {
              marginTop: '1.75rem',
              marginBottom: '1.75rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              paddingLeft: '0.375rem',
              lineHeight: '1.7',
            },
            'li::marker': {
              color: '#6366f1',
            },
            blockquote: {
              color: '#a0a0b0',
              borderLeftColor: '#6366f1',
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              backgroundColor: '#13131a',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              borderRadius: '0 0.375rem 0.375rem 0',
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
            },
            thead: {
              borderBottomWidth: '2px',
              borderBottomColor: '#1f1f29',
            },
            'thead th': {
              color: '#e8e8ee',
              fontWeight: '600',
              textAlign: 'left',
              padding: '0.75rem',
              backgroundColor: '#13131a',
            },
            'tbody td': {
              padding: '0.75rem',
              borderTopWidth: '1px',
              borderTopColor: '#1f1f29',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: '#1f1f29',
            },
            'tbody tr:hover': {
              backgroundColor: 'rgba(19, 19, 26, 0.5)',
            },
            hr: {
              borderColor: '#1f1f29',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
