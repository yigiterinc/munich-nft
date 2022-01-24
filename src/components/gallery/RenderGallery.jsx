import React from "react";
import { makeStyles, Divider } from "@material-ui/core";
import GalleryEditManager from "./GalleryEditManager";
import GalleryHeader from "./GalleryHeader";
import GalleryNfts from "./GalleryNfts";

const useStyles = makeStyles((theme) => ({
	renderGalleryContainer: {
		backgroundColor: theme.palette.background.default,
		paddingTop: "4vh",
	},
	galleryContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const RenderGallery = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.renderGalleryContainer}>
			<GalleryEditManager
				isOwner={props.isOwner}
				isEditMode={props.isEditable}
				switchEditableMode={props.switchEditableMode}
				handleUpdateGallery={props.handleUpdateGallery}
				galleryTheme={props.galleryTheme}
				setGalleryTheme={props.setGalleryTheme}
				headerLayout={props.headerLayout}
				setHeaderLayout={props.setHeaderLayout}
				setShowAddAssetsView={props.setShowAddAssetsView}
				setShowRemoveAssetsView={props.setShowRemoveAssetsView}
			/>
			<div className={classes.galleryContainer}>
				<GalleryHeader
					galleryJson={props.galleryJson}
					isOwner={props.isOwner}
					isEditable={props.isEditable}
					coverImage={props.coverImage}
					handleDropzoneSubmit={props.handleDropzoneSubmit}
					galleryName={props.galleryName}
					setGalleryName={props.setGalleryName}
					galleryDescription={props.galleryDescription}
					setGalleryDescription={props.setGalleryDescription}
					headerLayout={props.headerLayout}
					isCoverImageUpdated={props.isCoverImageUpdated}
					setIsCoverImageUpdated={props.setIsCoverImageUpdated}
				/>
				<GalleryNfts nfts={props.galleryJson.nfts} />
			</div>
		</div>
	);
};

export default RenderGallery;
