import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main background shades
        'terminal': {
          'darker': '#0A1120',
          'dark': '#0F172A',
          'DEFAULT': '#1E293B',
          'light': '#334155',
          'glow': '#1E293B33',
          'border': '#1E293B66'
        },
        // Accent colors
        'neon': {
          'blue': '#60A5FA',
          'cyan': '#67E8F9',
          'purple': '#A78BFA',
          'glow': '#60A5FA33',
          'active': '#93C5FD'
        },
        // Text colors
        'code': {
          'gray': '#94A3B8',
          'white': '#F8FAFC',
        }
      },
      backgroundOpacity: {
        '85': '0.85',
      },
      fontFamily: {
        'mono': ['Fira Code', 'JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'border-glow': 'border-glow 4s ease-in-out infinite',
        'scanline': 'scanline 6s linear infinite',
        'blink': 'blink 1.5s steps(2) infinite',
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cursor-blink': 'blink 1s step-end infinite',
        'text-glow': 'glow 2s ease-in-out infinite alternate',
        'soft-pulse': 'soft-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 0px rgb(96 165 250 / 0.0)' },
          '100%': { boxShadow: '0 0 20px rgb(96 165 250 / 0.3)' }
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgb(51 65 85 / 0.3)' },
          '50%': { borderColor: 'rgb(96 165 250 / 0.3)' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        'ping': {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        glow: {
          '0%': { textShadow: '0 0 0px rgb(96 165 250 / 0.0)' },
          '100%': { textShadow: '0 0 10px rgb(96 165 250 / 0.3)' }
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backdropBlur: {
        'xs': '2px'
      },
      boxShadow: {
        'terminal': '0 0 0 1px rgba(96, 165, 250, 0.05), 0 2px 4px rgba(96, 165, 250, 0.1)',
        'neon': '0 0 20px rgba(96, 165, 250, 0.3)',
      }
    },
  },
  plugins: [],
} satisfies Config;
