import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Ocean Blue Theme - Primary Brand Colors
        ocean: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8', // Accent light
          500: '#00A3E0', // Primary Accent (bright blue)
          600: '#00D4AA', // Secondary (teal/cyan)
          700: '#0A2540', // Primary (deep navy)
          800: '#081A2D',
          900: '#040D17',
          950: '#020508',
        },
        // Dark Mode Colors
        dark: {
          bg: '#0A0A0F',        // Main background (near black)
          surface: '#13131A',   // Card/panel background
          border: '#1F1F29',    // Borders
          hover: '#252532',     // Hover states
          text: {
            primary: '#F8FAFC',   // Primary text (white)
            secondary: '#94A3B8', // Secondary text (gray)
            muted: '#64748B',     // Muted text
          },
        },
        // Legacy brand colors (keep for compatibility)
        brand: {
          primary: '#00A3E0',   // Ocean Blue - Primary
          secondary: '#00D4AA', // Ocean Blue - Secondary (teal)
          accent: '#00A3E0',    // Ocean Blue - Accent
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
      fontFamily: {
        // Primary: Inter (as per brand guide)
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        // Code: JetBrains Mono (as per brand guide)
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
        // Display: Space Grotesk (optional for headlines)
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 170, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 212, 170, 0.4)',
      },
    },
  },
  plugins: [typography],
} satisfies Config;
