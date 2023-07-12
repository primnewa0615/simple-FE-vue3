// /** @type {import('tailwindcss').Config} **/
import plugin from 'tailwindcss/plugin'
module.exports = {
    content: [
        "./component/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
        './src/**/*.{html,js,ts,vue}', 
        "./node_modules/tw-elements/dist/js/**/*.{js,ts,vue}"
    ],
    theme: {
        screens: {
            tablet: "750px",
            laptop: "1024px",
            desktop: "1280px",
        },
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
            colors:{
              custBlue:"#064c8a",
              custOrange:"#e0523f",
              custGreen:"#7bb53e"
            }
        }
    },
    plugins: [],
};
