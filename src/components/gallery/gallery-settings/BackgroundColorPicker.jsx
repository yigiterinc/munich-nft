import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { ColorPicker, ColorPalette, createColor } from "material-ui-color";

const useStyles = makeStyles((theme) => ({
	backgroundColorContainer: {
		padding: theme.spacing(1),
	},
	colorPaletteContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	pickColorContainer: {
		marginTop: "4vh",
	},
	pickColorPanel: {
		marginTop: "2vh",
		display: "flex",
		justifyContent: "space-between",
	},
	label: {
		marginRight: "2vw",
	},
}));

const BackgroundColorPicker = (props) => {
	const palette = {
		black: "#080808",
		darkgrey: "#383838",
		whitesmoke: "#F5F5F5",
		purple: "#3B1C65",
		cyberpunk: "#F9EE00",
		mor: "purple",
	};

	const handleChange = (value) => {
		if (typeof value === "string") {
			props.setBackgroundColor(palette[value]);
		} else {
			props.setBackgroundColor("#" + value.hex);
		}
	};

	const classes = useStyles();

	return (
		<div className={classes.backgroundColorContainer}>
			<div className={classes.colorPaletteContainer}>
				<Typography variant="h6">
					You can set a custom background color to your gallery page. Pick a
					recommended color or any color with Color Picker.
				</Typography>
				<div className={classes.pickColorContainer}>
					<div className={classes.pickColorPanel}>
						<Typography variant="h6" className={classes.label}>
							Recommended Colors
						</Typography>
						<ColorPalette
							palette={palette}
							value={props.backgroundColor}
							onSelect={handleChange}
						/>
					</div>
					<div className={classes.pickColorPanel}>
						<Typography variant="h6" className={classes.label}>
							Color Picker
						</Typography>
						<ColorPicker
							defaultValue="transparent"
							value={props.backgroundColor}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BackgroundColorPicker;
