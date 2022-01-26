import React from "react";
import { makeStyles, Typography, createTheme } from "@material-ui/core";
import { ColorPicker } from "material-ui-color";

const useStyles = makeStyles((theme) => ({
	".MuiInputBase-root": {
		color: theme.palette.common.black,
	},
	pickColorContainer: {
		width: "600px",
		color: theme.palette.common.black,
		display: "flex",
		justifyContent: "center",
	},
	picker: {
		color: theme.palette.common.black,
		width: "250px",
	},
	colorPicker: {
		color: theme.palette.common.black,
		margin: "auto",
	},
	label: {
		color: theme.palette.common.black,
		marginLeft: "1vw",
	},
}));

const ThemePicker = (props) => {
	const handleBackgroundColorChange = (value) => {
		let backgroundColorType = lightOrDark(value.rgb);
		let backgroundColor = value.css.backgroundColor;
		let fontColor = backgroundColorType === "light" ? "#000" : "#fff";
		let fontContrastColor = fontColor === "#000" ? "#fff" : "#000";
		let themeVariable = createTheme({
			palette: {
				background: {
					default: `${backgroundColor}`,
				},
				text: {
					primary: `${fontColor}`,
				},
				primary: {
					main: `${props.galleryTheme.palette.primary.main}`,
					contrastText: `${fontContrastColor}`,
				},
			},
		});

		let theme = createTheme(themeVariable);
		props.setGalleryTheme(theme);
	};

	const handleKeyColorChange = (value) => {
		let keyColor = value.css.backgroundColor;
		let prevTheme = props.galleryTheme;

		prevTheme.palette.primary.main = keyColor;
		props.setGalleryTheme(createTheme(prevTheme));
	};

	const backColor = props.galleryTheme.palette.background.default;
	const keyColor = props.galleryTheme.palette.primary.main;
	const classes = useStyles();
	return (
		<div className={classes.pickColorContainer}>
			<div className={classes.picker}>
				<Typography variant="h6" className={classes.label}>
					Background Color
				</Typography>
				<div className={classes.colorPicker}>
					<ColorPicker
						value={backColor}
						onChange={handleBackgroundColorChange}
					/>
				</div>
			</div>
			<div className={classes.picker}>
				<Typography variant="h6" className={classes.label}>
					Key Color
				</Typography>
				<ColorPicker
					className={classes.colorPicker}
					value={keyColor}
					onChange={handleKeyColorChange}
				/>
			</div>
		</div>
	);
};

const lightOrDark = (color) => {
	let r = color[0];
	let g = color[1];
	let b = color[2];
	const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
	return hsp > 127.5 ? "light" : "dark";
};

export default ThemePicker;
