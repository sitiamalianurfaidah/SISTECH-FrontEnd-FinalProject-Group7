// tailwind.config.js
import { type Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        fontFamily: {
            'archivo-expanded': ['"Archivo Expanded"', 'sans-serif'],
            'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
            'space-mono': ['"Space Mono"', 'monospace'],
        },
        colors: {
            'dark-blue': '#003E85',
            'yellow-accent': '#FFD000',
        },
        animation: {
            'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        },
    },
    plugins: [],
}
export default config;