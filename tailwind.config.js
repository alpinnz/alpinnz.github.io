/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#EDF7FD',
                    100: '#C7E6F8',
                    200: '#ACDAF5',
                    300: '#86C9F1',
                    400: '#6FBEEE',
                    500: '#4BAEEA',
                    600: '#449ED5',
                    700: '#357CA6',
                    800: '#296081',
                    900: '#204962',
                },
                neutral: {
                    0: '#FFFFFF',
                    50: '#F1F1F1',
                    100: '#D3D3D3',
                    200: '#BDBDBD',
                    300: '#9F9F9F',
                    400: '#8D8D8D',
                    500: '#707070',
                    600: '#666666',
                    700: '#505050',
                    800: '#3E3E3E',
                    900: '#2F2F2F',
                    1000: '#000000',
                },
                danger: {
                    50: '#FFE7E7',
                    100: '#FFB5B5',
                    200: '#FF9191',
                    300: '#FF5E5E',
                    400: '#FF3F3F',
                    500: '#FF0F0F',
                    600: '#E80E0E',
                    700: '#B50B0B',
                    800: '#8C0808',
                    900: '#6B0606',
                },
                success: {
                    50: '#F1FAEB',
                    100: '#D5EFC0',
                    200: '#C0E7A1',
                    300: '#A4DB76',
                    400: '#92D55C',
                    500: '#77CA33',
                    600: '#6CB82E',
                    700: '#548F24',
                    800: '#416F1C',
                    900: '#325515',
                },
                info: {
                    50: '#E6F5FD',
                    100: '#B0DFF7',
                    200: '#8AD0F4',
                    300: '#54BBEE',
                    400: '#33ADEB',
                    500: '#0099E6',
                    600: '#008BD1',
                    700: '#006DA3',
                    800: '#00547F',
                    900: '#004061',
                },
                warning: {
                    50: '#FDFAE6',
                    100: '#F9EFB0',
                    200: '#F6E78A',
                    300: '#F2DC54',
                    400: '#EFD533',
                    500: '#EBCB00',
                    600: '#D6B900',
                    700: '#A79000',
                    800: '#817000',
                    900: '#635500',
                },
            },
        }
    },
    plugins: [],
}