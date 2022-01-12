const BACKGROUND_COLORS = {
	cyberpunk: "#F9EE00",
	immutableX: "#191E2B",
	solanart: "#240352",
	classic: "#5F5F5",
	darkgrey: "#383838",
	black: "#080808",
};

const CLASSIC_THEME = {
	palette: {
		background: {
			default: BACKGROUND_COLORS.immutableX,
		},
		text: {
			primary: "#23D1E9",
			secondary: "#fff",
		},
		primary: {
			main: "#FF003B",
		},
	},
};
const BLACK_THEME = {
	palette: {
		background: {
			default: BACKGROUND_COLORS.immutableX,
		},
		text: {
			primary: "#23D1E9",
			secondary: "#fff",
		},
		primary: {
			main: "#FF003B",
		},
	},
};
const DARKGREY_THEME = {
	palette: {
		background: {
			default: BACKGROUND_COLORS.immutableX,
		},
		text: {
			primary: "#23D1E9",
			secondary: "#fff",
		},
		primary: "#FF003B",
	},
};
const CYBERPUNK_THEME = {
	palette: {
		background: {
			default: BACKGROUND_COLORS.cyberpunk,
		},
		text: {
			primary: "#000",
			secondary: "#fff",
		},
		primary: {
			main: "#FF003B",
		},
		secondary: {
			main: "#00D8F2",
		},
	},
};
const IMMUTABLEX_THEME = {
	palette: {
		background: {
			default: BACKGROUND_COLORS.immutableX,
		},
		text: {
			primary: "#000",
			secondary: "#fff",
		},
		primary: {
			main: "#FF003B",
		},
		secondary: {
			main: "#1D1F27",
		},
	},
};
const SOLANART_THEME = {
	palette: {
		background: {
			default: BACKGROUND_COLORS.immutableX,
		},
		text: {
			primary: "#FFFFFF",
			secondary: "#10CAF0",
		},
		primary: {
			main: "#11B981",
		},
	},
};

export const RECOMMENDED_THEMES = [
	{
		name: "classic",
		theme: CLASSIC_THEME,
	},
	{
		name: "black",
		theme: BLACK_THEME,
	},
	{
		name: "darkgrey",
		theme: DARKGREY_THEME,
	},
	{
		name: "cyberpunk",
		theme: CYBERPUNK_THEME,
	},
	{
		name: "immutableX",
		theme: IMMUTABLEX_THEME,
	},
	{
		name: "solanart",
		theme: SOLANART_THEME,
	},
];
