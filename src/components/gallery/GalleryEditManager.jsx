import React from "react";
import { darken, makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import ThemeColorPicker from "./gallery-edit-manager/ThemeColorPicker";
import LayoutPicker from "./gallery-edit-manager/LayoutPicker";

const useStyles = makeStyles((theme) => ({
	galleryEditManagerContainer: {
		top: "4vh",
		marginTop: "-4vh",
		marginBottom: "2vh",
		height: "96px",
		borderBottom: "1px solid rgb(229, 232, 235)",
		background: "rgb(229, 232, 235)",
		width: "100%",
		display: "flex",
		alignItems: "center",
	},
	gallerySettingsContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonsContainer: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	cancelButton: {
		width: "100px",
		color: "#FFFFFF",
		margin: "13px 15px",
		padding: "13px 15px",
		"&:disabled": {
			opacity: "80%",
		},
		background: "#b35bff",
		"&:hover": {
			background: darken("#b35bff", 0.1),
		},
	},
	saveButton: {
		width: "100px",
		color: "#FFFFFF",
		margin: "13px 15px",
		padding: "13px 15px",
		"&:disabled": {
			opacity: "80%",
		},
		background: "#218838",
		"&:hover": {
			background: darken("#218838", 0.1),
		},
	},
}));

const GalleryEditManager = (props) => {
	const classes = useStyles();

	return (
		<>
			{props.isEditMode && (
				<div className={classes.galleryEditManagerContainer}>
					<Grid item={true} xs={1} />
					<Grid item={true} xs={7}>
						<div className={classes.gallerySettingsContainer}>
							<ThemeColorPicker
								galleryTheme={props.galleryTheme}
								setGalleryTheme={props.setGalleryTheme}
							/>
							<LayoutPicker
								headerLayout={props.headerLayout}
								setHeaderLayout={props.setHeaderLayout}
								nftsLayout={props.nftsLayout}
								setNftsLayout={props.setNftsLayout}
							/>
						</div>
					</Grid>
					<Grid item={true} xs={3}>
						<div className={classes.buttonsContainer}>
							<Button
								className={classes.cancelButton}
								size="large"
								variant="contained"
								onClick={() => {
									window.location.reload(false);
								}}
							>
								Cancel
							</Button>
							<Button
								className={classes.saveButton}
								size="large"
								variant="contained"
								onClick={() => {
									props.switchEditableMode();
									props.handleUpdateGallery();
								}}
							>
								SAVE
							</Button>
						</div>
					</Grid>

					<Grid item={true} xs={1} />
				</div>
			)}
		</>
	);
};

export default GalleryEditManager;
