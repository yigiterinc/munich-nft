import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	IconButton,
	makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
	dialogWrapper: {
		padding: theme.spacing(1),
		position: "absolute",
		top: theme.spacing(6),
	},
	title: {
		lineHeight: "48px",
	},
	titleContainer: {
		maxWidth: "100%",
		margin: "auto",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
}));
const GallerySettings = (props) => {
	const { children, openGallerySettings, setOpenGallerySettings } = props;
	const classes = useStyles();

	return (
		<Dialog
			open={openGallerySettings}
			maxWidth="md"
			classes={{ paper: classes.dialogWrapper }}
		>
			<DialogTitle>
				<div className={classes.titleContainer}>
					<Typography variant="h6" component="div" className={classes.title}>
						Settings
					</Typography>
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
			<DialogContent dividers>
				<div>content goes here</div>
			</DialogContent>
		</Dialog>
	);
};

export default GallerySettings;
