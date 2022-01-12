import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ThemeColorPicker from "./gallery-settings/ThemeColorPicker";
import LayoutPicker from "./gallery-settings/LayoutPicker";

const useStyles = makeStyles((theme) => ({
	dialogWrapper: {
		position: "absolute",
		top: theme.spacing(6),
	},
	dialogTitleWrapper: {
		height: "0px",
	},
	closeDialogPanel: {
		maxWidth: "100%",
		margin: "auto",
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
	},
}));
const GallerySettings = (props) => {
	const classes = useStyles();

	return (
		<Dialog
			open={props.openGallerySettings}
			classes={{ paper: classes.dialogWrapper }}
		>
			<DialogTitle className={classes.dialogTitleWrapper} component="div">
				<div className={classes.closeDialogPanel}>
					<IconButton
						aria-label="close-gallery-settings"
						onClick={() => {
							props.setOpenGallerySettings(false);
						}}
					>
						<CloseIcon />
					</IconButton>
				</div>
			</DialogTitle>
			<DialogContent>
				<div>
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
			</DialogContent>
		</Dialog>
	);
};

export default GallerySettings;
