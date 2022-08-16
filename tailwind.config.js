/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			body: ["Kumbh Sans"],
			display: ["Kumbh Sans"],
		},
		extend: {
			colors: {
				layout: {
					100: "#FAFAFA",
					300: "#EAEAEA",
					500: "#333333",
					700: "#191919",
					900: "#090909",
				},
			},
		},
	},
	plugins: [],
};
