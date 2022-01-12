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
	backgroundColorContainer: {
		padding: theme.spacing(2),
	},
	colorPaletteContainer: {
		alignItems: "center",
		justifyContent: "center",
		color: theme.palette.common.black,
	},
	divider: {
		marginTop: "2vh",
	},
	pickColorContainer: {
		marginTop: "2vh",
	},
	pickColorPanel: {
		marginTop: "2vh",
		display: "flex",
		alignItems: "center",
	},
	label: {
		marginRight: "2vw",
	},
}));

const ThemeColorPicker = (props) => {
	const palette = createPalette(RECOMMENDED_THEMES);

	const handleChange = (value) => {
		let themeVariable = themeFinder(value);
		let theme = createTheme(themeVariable);
		props.setGalleryTheme(theme);
	};

	const classes = useStyles();

	return (
		<div className={classes.backgroundColorContainer}>
			<div className={classes.colorPaletteContainer}>
				<Typography variant="h5">Theme Settings</Typography>
				<Divider className={classes.divider} />
				<div className={classes.pickColorContainer}>
					<Typography variant="h6">
						You can set color theme to your gallery page. Pick a recommended
						theme
					</Typography>
					<div className={classes.pickColorPanel}>
						<Typography variant="h6" className={classes.label}>
							Recommended Themes
						</Typography>
						<ColorPalette palette={palette} onSelect={handleChange} />
					</div>
				</div>
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

export default ThemeColorPicker;
