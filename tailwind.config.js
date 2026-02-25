/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lime: {
                    DEFAULT: '#A3E635',
                },
                primary: {
                    DEFAULT: '#FFFFFF',
                    dark: '#F5F5F5',
                },
                surface: '#FFFFFF',
                accent: {
                    purple: '#A855F7',
                    blue: '#3B82F6',
                    orange: '#F97316',
                    crimson: '#E11D48',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
            },
            boxShadow: {
                soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
