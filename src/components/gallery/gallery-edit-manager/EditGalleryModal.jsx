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
			open={props.openEditGalleryModal}
			classes={{ paper: classes.dialogWrapper }}
		>
			<EditGalleryTabs
				closeEditGalleryModal={props.closeEditGalleryModal}
				headerLayout={props.headerLayout}
				setHeaderLayout={props.setHeaderLayout}
				galleryTheme={props.galleryTheme}
				setGalleryTheme={props.setGalleryTheme}
				switchEditableMode={props.switchEditableMode}
			/>
		</Dialog>
	);
};

export default EditGalleryModal;
