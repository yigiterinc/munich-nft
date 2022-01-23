import React from "react";
import {
	makeStyles,
	Typography,
	Divider,
	createTheme,
} from "@material-ui/core";
import { ColorPalette } from "material-ui-color";
import { RECOMMENDED_THEMES } from "../../../themes/galleryThemes";

const useStyles = makeStyles((theme) => ({
	pickColorContainer: {
		height: "80px",
		display: "flex",
		alignItems: "center",
	},
	pickColorPanel: {
		display: "flex",
		alignItems: "center",
	},
	label: {
		marginRight: "1vw",
	},
}));

const ThemePicker = (props) => {
	const palette = createPalette(RECOMMENDED_THEMES);

	const handleChange = (value) => {
		let themeVariable = themeFinder(value);
		let theme = createTheme(themeVariable);
		props.setGalleryTheme(theme);
	};

	const classes = useStyles();

	return (
		<div className={classes.pickColorContainer}>
			<div className={classes.pickColorPanel}>
				<Typography variant="h6" className={classes.label}>
					Themes
				</Typography>
				<ColorPalette palette={palette} onSelect={handleChange} />
			</div>
		</div>
	);
};

const createPalette = (themes) => {
	const paletteObj = {};
	for (let i = 0; i < themes.length; i++) {
		let name = themes[i].name;
		Object.assign(paletteObj, {
			[name]: themes[i].theme.palette.background.default,
		});
	}
	return paletteObj;
};

const themeFinder = (themeName) => {
	for (let i = 0; i < RECOMMENDED_THEMES.length; i++) {
		if (RECOMMENDED_THEMES[i].name === themeName) {
			return RECOMMENDED_THEMES[i].theme;
		}
	}
};

export default ThemePicker;
