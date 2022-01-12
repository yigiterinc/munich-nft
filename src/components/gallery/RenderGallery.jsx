import React from "react";
import { makeStyles } from "@material-ui/core";
import GalleryEditManager from "./GalleryEditManager";
import GalleryCoverImage from "./GalleryCoverImage";
import GalleryHeaderPanel from "./GalleryHeaderPanel";
import GallerySettings from "./GallerySettings";
import AssetCard from "../common/AssetCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	galleryContainer: {
		backgroundColor: theme.palette.background.default,
		paddingTop: "4vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	galleryHeaderContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "80vw",
	},
	nftContainer: {
		paddingTop: "10vh",
		width: "80vw",
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
				setOpenGallerySettings={props.setOpenGallerySettings}
			/>
			<GallerySettings
				openGallerySettings={props.openGallerySettings}
				setOpenGallerySettings={props.setOpenGallerySettings}
				galleryTheme={props.galleryTheme}
				setGalleryTheme={props.setGalleryTheme}
				headerLayout={props.headerLayout}
				setHeaderLayout={props.setHeaderLayout}
				nftsLayout={props.nftsLayout}
				setNftsLayout={props.setNftsLayout}
			/>
			{renderGalleryHeader(
				classes,
				props.galleryJson,
				props.switchGalleryEditMode,
				props.isEditable,
				props.isOwner,
				props.coverImage,
				props.handleDropzoneSubmit,
				props.galleryName,
				props.galleryDescription,
				props.setGalleryName,
				props.setGalleryDescription
			)}
			{renderNftsInGallery(classes, props.galleryJson.nfts)}
		</div>
	);
};

const renderGalleryHeader = (
	classes,
	galleryJson,
	switchGalleryEditMode,
	isEditable,
	isOwner,
	coverImage,
	handleDropzoneSubmit,
	galleryName,
	galleryDescription,
	setGalleryName,
	setGalleryDescription
) => {
	return (
		<Grid container spacing={6} className={classes.galleryHeaderContainer}>
			<Grid item lg={5} md={5} sm={6} xs={8}>
				<GalleryCoverImage
					coverImage={coverImage}
					isEditable={isEditable}
					isOwner={isOwner}
					handleDropzoneSubmit={handleDropzoneSubmit}
				/>
			</Grid>
			<Grid item lg={7} md={7} sm={6} xs={4}>
				<GalleryHeaderPanel
					json={galleryJson}
					switchEditableMode={switchGalleryEditMode}
					isEditable={isEditable}
					isOwner={isOwner}
					galleryName={galleryName}
					setGalleryName={setGalleryName}
					galleryDescription={galleryDescription}
					setGalleryDescription={setGalleryDescription}
				/>
			</Grid>
		</Grid>
	);
};

export const renderNftsInGallery = (classes, nfts) => {
	return (
		<Grid container spacing={4} className={classes.nftContainer}>
			{nfts.map((item) => {
				return (
					<Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
						<AssetCard asset={item} />
					</Grid>
				);
			})}
		</Grid>
	);
};

export default RenderGallery;
