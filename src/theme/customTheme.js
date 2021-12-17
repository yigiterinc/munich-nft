import { COLORS, FONTS } from "./variables";

export const CUSTOM_THEME = {
	palette: {
		background: {
			default: COLORS.backgroundColor,
		},
		text: {
			primary: "#FFFFFF",
		},
		primary: {
			main: COLORS.walletBtn,
			dark: COLORS.walletBtnHover,
		},
		secondary: {
			light: COLORS.secondaryHover,
			main: COLORS.secondary,
			dark: COLORS.secondaryDark,
		},
		info: { main: COLORS.btn },
	},
	typography: {
		htmlFontSize: FONTS.default,
		fontFamily: ["Nunito", "sans-serif"].join(","),
		fontSize: FONTS.default,
		fontWeightLight: 200,
		fontWeightMedium: 400,
		h1: {
			fontWeight: 200,
			fontSize: FONTS.xxl,
		},
		h2: {
			fontWeight: 200,
			fontSize: FONTS.xl,
		},
		h3: { fontWeight: 400, fontSize: FONTS.l },
		h4: { fontWeight: 400, fontSize: FONTS.m },
		h5: { fontWeight: 400, fontSize: FONTS.s },
		h6: { fontWeight: 400, fontSize: FONTS.xs },
	},
	shape: {
		borderRadius: 8,
	},
};
