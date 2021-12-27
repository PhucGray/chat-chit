const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                teal: colors.teal,
                trueGray: colors.trueGray,
            },
            animation: {
                fallDown: 'fallDown 1s ease',
                ltr: 'ltr 1.2s ease',
                rtl: 'rtl 1.4s ease',
                up: 'up 1.2s ease',
            },
            keyframes: {
                fallDown: {
                    '0%': {
                        transform: 'translateY(-100px)',
                        opacity: 0,
                    },
                    '100%': {
                        transform: 'translateY(0px)',
                        opacity: 1,
                    },
                },
                ltr: {
                    '0%': { transform: 'translateX(-300px)', opacity: 0 },
                    '100%': { transform: 'translateX(0px)', opacity: 1 },
                },
                rtl: {
                    '0%': { transform: 'translateX(300px)', opacity: 0 },
                    '100%': { transform: 'translateX(0px)', opacity: 1 },
                },
                up: {
                    '0%': { transform: 'translateY(300px)', opacity: 0 },
                    '100%': { transform: 'translateY(0px)', opacity: 1 },
                },
            },
        },
        container: {
            center: true,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
