import React, { useState } from "react";
import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core";

import EditGalleryModal from "./gallery-edit-manager/EditGalleryModal";
import GalleryHeader from "./GalleryHeader";
import GalleryNfts from "./GalleryNfts";

const useStyles = makeStyles((theme) => ({
	renderGalleryContainer: {
		backgroundColor: theme.palette.background.default,
		paddingTop: "10vh",
		height: "100%",
	},
}));

const RenderGallery = (props) => {
	const [openEditGalleryModal, setOpenEditGalleryModal] = useState(false);
	const closeEditGalleryModal = () => setOpenEditGalleryModal(false);

	const defaultTheme = createTheme({
		palette: {
			background: {
				default: "#fff",
			},
			text: {
				primary: "#000",
			},
			primary: {
				main: "#000",
				contrastText: "#fff",
			},
		},
	});

	const classes = useStyles();
	return (
		<div className={classes.renderGalleryContainer}>
			<div className={classes.galleryContainer}>
				<GalleryHeader
					openEditGalleryModal={openEditGalleryModal}
					closeEditGalleryModal={closeEditGalleryModal}
					setOpenEditGalleryModal={setOpenEditGalleryModal}
					isOwner={props.isOwner}
					isEditable={props.isEditable}
					switchEditableMode={props.switchEditableMode}
					handleUpdateGallery={props.handleUpdateGallery}
					galleryJson={props.galleryJson}
					coverImage={props.coverImage}
					handleDropzoneSubmit={props.handleDropzoneSubmit}
					galleryName={props.galleryName}
					setGalleryName={props.setGalleryName}
					galleryDescription={props.galleryDescription}
					setGalleryDescription={props.setGalleryDescription}
					headerLayout={props.headerLayout}
					setHeaderLayout={props.setHeaderLayout}
					galleryTheme={props.galleryTheme}
					setGalleryTheme={props.setGalleryTheme}
					isCoverImageUpdated={props.isCoverImageUpdated}
					setIsCoverImageUpdated={props.setIsCoverImageUpdated}
					setShowAddAssetsView={props.setShowAddAssetsView}
					setShowRemoveAssetsView={props.setShowRemoveAssetsView}
				/>
				<GalleryNfts nfts={props.galleryJson.nfts} />

				<ThemeProvider theme={defaultTheme}>
					<EditGalleryModal
						openEditGalleryModal={openEditGalleryModal}
						closeEditGalleryModal={closeEditGalleryModal}
						switchEditableMode={props.switchEditableMode}
						headerLayout={props.headerLayout}
						setHeaderLayout={props.setHeaderLayout}
						galleryTheme={props.galleryTheme}
						setGalleryTheme={props.setGalleryTheme}
					/>
				</ThemeProvider>
			</div>
		</div>
	);
};

export default RenderGallery;
