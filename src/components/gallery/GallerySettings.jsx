import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CustomTabs from "./gallery-settings/CustomTabs";

const useStyles = makeStyles((theme) => ({
	dialogWrapper: {
		minHeight: 1000,
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
	const { children, openGallerySettings, setOpenGallerySettings } = props;
	const classes = useStyles();

	return (
		<Dialog
			open={openGallerySettings}
			classes={{ paper: classes.dialogWrapper }}
		>
			<DialogTitle className={classes.dialogTitleWrapper} component="div">
				<div className={classes.closeDialogPanel}>
					<IconButton
						aria-label="close-gallery-settings"
						onClick={() => {
							setOpenGallerySettings(false);
						}}
					>
						<CloseIcon />
					</IconButton>
				</div>
			</DialogTitle>
			<DialogContent>
				<div>
					<CustomTabs
						setBackgroundColor={props.setBackgroundColor}
						backgroundColor={props.backgroundColor}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default GallerySettings;
