import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import EditGalleryButton from "./gallery-edit-manager/EditGalleryButton";
import EditGalleryModal from "./gallery-edit-manager/EditGalleryModal";

const useStyles = makeStyles((theme) => ({
	galleryEditManagerContainer: {
		position: "fixed",
		height: "40px",
		marginTop: "-1.2vh",
		marginBottom: "2.5vh",
		marginLeft: "2vw",
		color: theme.palette.secondary.light,
	},
}));

const GalleryEditManager = (props) => {
	const [openLayoutModal, setOpenLayoutModal] = useState(false);
	const closeLayoutModal = () => setOpenLayoutModal(false);

	const classes = useStyles();
	return (
		<>
			{props.isOwner && (
				<div className={classes.galleryEditManagerContainer}>
					<EditGalleryButton
						setOpenLayoutModal={setOpenLayoutModal}
						isEditMode={props.isEditMode}
						switchEditableMode={props.switchEditableMode}
						handleUpdateGallery={props.handleUpdateGallery}
						setShowAddAssetsView={props.setShowAddAssetsView}
						setShowRemoveAssetsView={props.setShowRemoveAssetsView}
					></EditGalleryButton>
					<EditGalleryModal
						openLayoutModal={openLayoutModal}
						closeLayoutModal={closeLayoutModal}
						switchEditableMode={props.switchEditableMode}
						headerLayout={props.headerLayout}
						setHeaderLayout={props.setHeaderLayout}
						galleryTheme={props.galleryTheme}
						setGalleryTheme={props.setGalleryTheme}
					/>
				</div>
			)}
		</>
	);
};

export default GalleryEditManager;
