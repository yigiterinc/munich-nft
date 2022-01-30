import React from "react";
import { makeStyles } from "@material-ui/core";
import EditGalleryButton from "./gallery-edit-manager/EditGalleryButton";

const useStyles = makeStyles((theme) => ({
	galleryEditManagerContainer: {
		color: theme.palette.secondary.light,
	},
}));

const GalleryEditManager = (props) => {
	const classes = useStyles();
	return (
		<>
			{props.isOwner && (
				<div className={classes.galleryEditManagerContainer}>
					<EditGalleryButton
						setOpenEditGalleryModal={props.setOpenEditGalleryModal}
						isEditMode={props.isEditMode}
						switchEditableMode={props.switchEditableMode}
						handleUpdateGallery={props.handleUpdateGallery}
						setShowAddAssetsView={props.setShowAddAssetsView}
						setShowRemoveAssetsView={props.setShowRemoveAssetsView}
					></EditGalleryButton>
				</div>
			)}
		</>
	);
};

export default GalleryEditManager;
