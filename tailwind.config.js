/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                neon: {
                    cyan: '#00f5ff',
                    blue: '#3b82f6',
                    purple: '#a855f7',
                },
                background: '#0a0a0a',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'glow-cyan': '0 0 20px rgba(0, 245, 255, 0.35), 0 0 60px rgba(0, 245, 255, 0.1)',
                'glow-blue': '0 0 20px rgba(59, 130, 246, 0.35), 0 0 60px rgba(59, 130, 246, 0.1)',
                'glow-sm-cyan': '0 0 8px rgba(0, 245, 255, 0.5)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'grid-pattern': 'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
            },
            backgroundSize: {
                'grid': '60px 60px',
            },
            animation: {
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'border-flow': 'borderFlow 4s linear infinite',
            },
            keyframes: {
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.2)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 245, 255, 0.5), 0 0 80px rgba(0, 245, 255, 0.15)' },
                },
            },
        },
    },
    plugins: [],
}
