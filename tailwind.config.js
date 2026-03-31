/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                fursanBlue: '#0D47A1',
                fursanLightBlue: '#2A69C6',
            },
            fontFamily: {
                alexandria: ['Alexandria', 'sans-serif'],
            },
        },
    },
    plugins: [],
}