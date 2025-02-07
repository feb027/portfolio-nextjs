import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
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
          'bg': '#0D1117',
          'surface': '#161B22',
          'accent': '#58A6FF',
          'syntax': {
            'string': '#A5D6FF',
            'keyword': '#FF7B72',
            'function': '#D2A8FF',
            'variable': '#79C0FF',
            'comment': '#8B949E'
          }
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
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'float-slow': 'float-slow 15s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
        'glitch': 'glitch 0.3s linear infinite',
        'matrix-fall': 'matrix-fall 10s linear infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
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
        'soft-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, 10px) rotate(5deg)' },
          '50%': { transform: 'translate(0, 20px) rotate(0deg)' },
          '75%': { transform: 'translate(-10px, 10px) rotate(-5deg)' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -2%)' },
          '20%': { transform: 'translate(2%, 2%)' },
          '30%': { transform: 'translate(-1%, 1%)' },
          '40%': { transform: 'translate(1%, -1%)' },
          '50%': { transform: 'translate(-2%, 2%)' },
          '60%': { transform: 'translate(2%, -2%)' },
          '70%': { transform: 'translate(-1%, -1%)' },
          '80%': { transform: 'translate(1%, 1%)' },
          '90%': { transform: 'translate(-2%, -2%)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
      },
      backdropBlur: {
        'xs': '2px'
      },
      boxShadow: {
        'terminal': '0 0 0 1px rgba(96, 165, 250, 0.05), 0 2px 4px rgba(96, 165, 250, 0.1)',
        'neon': '0 0 20px rgba(96, 165, 250, 0.3)',
      },
      backgroundImage: {
        'scanline': 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 50%)',
        'code-gradient': 'linear-gradient(135deg, #1a1d24 0%, #0D1117 100%)',
        'accent-gradient': 'linear-gradient(135deg, #58A6FF 0%, #79C0FF 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'scanline': '100% 4px',
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
} satisfies Config;
