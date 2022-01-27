const THEME_BACKGROUND_COLORS = {
	classic: "#FFFFFF",
	dark: "#080808",
	cyberpunk: "#F9EE00",
	immutableX: "#191E2B",
	solanart: "#240352",
};

const CLASSIC_THEME = {
	palette: {
		background: {
			default: THEME_BACKGROUND_COLORS.classic,
		},
		text: {
			primary: "#000", // gallery-name, description
			secondary: "rgba(0, 0, 0, 0.54)", // nft-card-collection-text
		},
		primary: {
			// galleryOwner Button
			main: "rgb(32, 129, 226)", // creator-link
			contrastText: "#1867B7", // creator-link hovered
		},
		secondary: {
			// assetCard
			light: "#707070", // collectionText
			main: "#000", //nftText
		},
		info: {
			main: THEME_BACKGROUND_COLORS.classic, // nft asset card background color
		},
	},
};
const DARK_THEME = {
	palette: {
		background: {
			default: THEME_BACKGROUND_COLORS.dark,
		},
		text: {
			primary: "#fff", // gallery-name, description
			secondary: "#fff", // nft-card-collection-text
		},
		primary: {
			// galleryOwner Button
			main: "#fff", // created-link
			contrastText: "#D3D3D3", // creator-link hovered
		},
		secondary: {
			// assetCard
			light: "#707070", // collectionText
			main: "#fff", //nftText
		},
		info: {
			main: "#383838", // nft asset card background color
		},
	},
};
const CYBERPUNK_THEME = {
	palette: {
		background: {
			default: THEME_BACKGROUND_COLORS.cyberpunk,
		},
		text: {
			primary: "#000", // gallery-name, nft-card-text
			secondary: "rgba(0, 0, 0, 0.54)", // nft-card-collection-text
		},
		primary: {
			// galleryOwner Button
			main: "#FF003B", // creator-link
			contrastText: "#8B0000", // creator-link hover
		},
		secondary: {
			// assetCard
			light: "#000", // collectionText
			main: "#000", //nftText
		},
		info: {
			main: "#03D7F1", // nft asset card background color
		},
	},
};
const IMMUTABLEX_THEME = {
	palette: {
		background: {
			default: THEME_BACKGROUND_COLORS.immutableX,
		},
		text: {
			primary: "#fff", // gallery-name, nft-card-text
			secondary: "#fff", // nft-card-collection-text
		},
		primary: {
			// galleryOwner Button
			main: "#30A6BA", // creator-link
			contrastText: "#217482", // creator-link hover
		},
		secondary: {
			// assetCard
			light: "#707070", // collectionText
			main: "#fff", //nftText
		},
		info: {
			main: "rgb(28, 31, 39)", // nft asset card background color
		},
	},
};
const SOLANART_THEME = {
	palette: {
		background: {
			default: THEME_BACKGROUND_COLORS.solanart,
		},
		text: {
			primary: "#fff", // gallery-name, nft-card-text
			secondary: "#fff", // nft-card-collection-text
		},
		primary: {
			// galleryOwner Button
			main: "#11B981", //  creator-link
			contrastText: "#0d9467", // creator-link hover
		},
		secondary: {
			// assetCard
			light: "#fff", // collectionText
			main: "#1CC1E9", //nftText
		},
		info: {
			main: "#3B1C65", // nft asset card background color
		},
	},
};

export const RECOMMENDED_THEMES = [
	{
		name: "classic",
		theme: CLASSIC_THEME,
	},
	{
		name: "dark",
		theme: DARK_THEME,
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
