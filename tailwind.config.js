const flowBite = require("flowbite-react/tailwind");
/** @style {import("tailwindcss").Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        flowBite.content(),
    ],
    theme: {
        extend: {
            center: true,
            colors: {
                "normal": "#252525",
                "secondary": {
                    "50": "#f8f8f8",
                    "100": "#eaeaea",
                    "200": "#dcdcdc",
                    "300": "#bdbdbd",
                    "400": "#989898",
                    "500": "#7c7c7c",
                    "600": "#656565",
                    "700": "#525252",
                    "800": "#464646",
                    "900": "#3d3d3d",
                    "950": "#292929",
                },

                "primary": {
                    "50": "#fff5ec",
                    "100": "#ffe9d3",
                    "200": "#ffcfa5",
                    "300": "#ffae6d",
                    "400": "#ff8032",
                    "500": "#ff5d0a",
                    "600": "#ff4200",
                    "700": "#cc2c02",
                    "800": "#a1230b",
                    "900": "#82200c",
                    "950": "#460c04",
                },
            },
        },
    },
    plugins: [
        flowBite.plugin(),
    ],
};

