import daisyui from "daisyui";
import tailwindCssAnimated from "tailwindcss-animated";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: ["wireframe"],
	},
	plugins: [daisyui, tailwindCssAnimated],
};
