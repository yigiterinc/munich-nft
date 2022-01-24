import React from "react";
import { Dialog, makeStyles } from "@material-ui/core";
import EditGalleryTabs from "./EditGalleryTabs";

const useStyles = makeStyles((theme) => ({
	dialogWrapper: {
		position: "absolute",
		top: theme.spacing(6),
	},
	dialogTitleWrapper: {
		height: "35px",
	},
	closeDialogPanel: {
		textAlign: "right",
	},
}));
const EditGalleryModal = (props) => {
	const classes = useStyles();

	return (
		<Dialog
			open={props.openLayoutModal}
			classes={{ paper: classes.dialogWrapper }}
		>
			<EditGalleryTabs
				closeLayoutModal={props.closeLayoutModal}
				headerLayout={props.headerLayout}
				setHeaderLayout={props.setHeaderLayout}
				galleryTheme={props.galleryTheme}
				setGalleryTheme={props.setGalleryTheme}
			/>
		</Dialog>
	);
};

export default EditGalleryModal;
