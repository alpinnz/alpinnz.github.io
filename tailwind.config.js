/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                '595260': '#595260',
                '2C2E43': '#2C2E43',
                '5952601A': '#5952601A',
            }
        },
    },
    plugins: [],
}