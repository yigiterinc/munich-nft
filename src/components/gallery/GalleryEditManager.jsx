import React from "react";
import { darken, makeStyles } from "@material-ui/core/styles";
import { Button, Grid, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ThemePicker from "./gallery-edit-manager/ThemePicker";
import LayoutPicker from "./gallery-edit-manager/LayoutPicker";

const useStyles = makeStyles((theme) => ({
	galleryEditManagerContainer: {
		marginTop: "-4vh",
		marginBottom: "4vh",
		height: "80px",
		borderBottom: "1px solid rgb(229, 232, 235)",
		background: "rgb(229, 232, 235)",
		width: "100%",
		display: "flex",
		alignItems: "center",
	},
	editGalleryContainer: {
		top: "4vh",
		marginTop: "-4vh",
		marginLeft: "2vw",
		display: "flex",
		width: "100%",
	},
	editGalleryButton: {
		color: theme.palette.secondary.light,
		marginTop: "3vh",
		marginLeft: "2vh",
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
			{props.isOwner && (
				<>
					{props.isEditMode ? (
						<div className={classes.galleryEditManagerContainer}>
							<Grid item={true} xs={1} />
							<Grid item={true} xs={7}>
								<div className={classes.gallerySettingsContainer}>
									<ThemePicker
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
					) : (
						<div className={classes.editGalleryContainer}>
							<div className={classes.editGalleryButton}>
								<Button
									aria-label="edit-gallery"
									startIcon={<EditIcon />}
									onClick={() => {
										props.switchEditableMode();
									}}
								>
									Edit
								</Button>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default GalleryEditManager;
