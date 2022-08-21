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
				carrot_orange: {
					100: "#F9E0C7",
					300: "#FBBA50",
					500: "#F8953C",
					700: "#DE571C",
				},
				carrot_green: {
					500: "#0B9D37",
				},
			},
			rotate: {
				10: "10deg",
				24: "24deg",
				8: "8deg",
			},
		},
	},
	plugins: [],
};
