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
        },
        colors: {
            'dark-blue': '#003E85',
            'yellow-accent': '#FFD000',
            'dark-bg': '#1A1A1A', // Warna background utama
            'card-bg': '#2C2C2C', // Warna background card quiz
            'blue-question-bg': '#003E85', // Warna baris pertanyaan gelap
            'white-question-bg': '#FFFFFF', // Warna baris pertanyaan terang
            'radio-red': '#FF4D4D',
            'radio-yellow': '#FFBF00',
            'radio-gray': '#A0A0A0',
            'radio-green-light': '#4CAF50',
            'radio-green-dark': '#2196F3', // Atau warna lain yang lebih sesuai
            'quiz-progress-bar': '#3B82F6', // Warna progress bar
            'button-yellow': '#FFD000',
            'button-text-dark': '#161616',
        },
        animation: {
            'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        },
    },
    plugins: [],
}
export default config;