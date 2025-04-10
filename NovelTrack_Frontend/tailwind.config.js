/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary: "#6197b7",
		  secondary: "#be9cd2",
		  foreground: 'rgb(var(--color-foreground))',
          text: 'rgb(var(--color-text))',
		},
		container: {
		  center: true,
		  padding: {
			DEFAULT: "1rem",
			sm: "2rem",
			lg: "3rem",
			xl: "4rem",
			"2xl": "6rem",
		  },
		},
	  },
	},
	plugins: [],
  };