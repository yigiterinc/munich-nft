import React from "react";
import { makeStyles } from "@material-ui/core";
import GalleryEditManager from "./GalleryEditManager";
import GalleryHeader from "./GalleryHeader";
import GalleryNfts from "./GalleryNfts";

const useStyles = makeStyles((theme) => ({
	galleryContainer: {
		backgroundColor: theme.palette.background.default,
		paddingTop: "4vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const RenderGallery = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.galleryContainer}>
			<GalleryEditManager
				isEditMode={props.isEditable}
				switchEditableMode={props.switchGalleryEditMode}
				handleUpdateGallery={props.handleUpdateGallery}
				galleryTheme={props.galleryTheme}
				setGalleryTheme={props.setGalleryTheme}
				headerLayout={props.headerLayout}
				setHeaderLayout={props.setHeaderLayout}
				nftsLayout={props.nftsLayout}
				setNftsLayout={props.setNftsLayout}
			/>
			<GalleryHeader
				galleryJson={props.galleryJson}
				isEditable={props.isEditable}
				switchEditableMode={props.switchGalleryEditMode}
				isOwner={props.isOwner}
				coverImage={props.coverImage}
				handleDropzoneSubmit={props.handleDropzoneSubmit}
				galleryName={props.galleryName}
				setGalleryName={props.setGalleryName}
				galleryDescription={props.galleryDescription}
				setGalleryDescription={props.setGalleryDescription}
				headerLayout={props.headerLayout}
				setIsCoverImageUpdated={props.setIsCoverImageUpdated}
			/>
			<GalleryNfts
				nfts={props.galleryJson.nfts}
				nftsLayout={props.nftsLayout}
			/>
		</div>
	);
};

export default RenderGallery;
