import React, { useEffect, useState } from "react";
import { createTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import { isUserLoggedIn } from "../utils/auth-utils";
import { convertToSlug, withDefault } from "../utils/commons";
import { updateGallery, uploadImageToMediaGallery } from "../api/strapi";
import { useHistory } from "react-router-dom";
import GalleryHeader from "../components/gallery/GalleryHeader";
import GalleryNfts from "../components/gallery/GalleryNfts";
import EditGalleryModal from "../components/gallery/gallery-edit-manager/EditGalleryModal";

const useStyles = makeStyles((theme) => ({
	galleryContainer: {
		paddingTop: "10vh",
		height: "100%",
	},
}));

const Gallery = (props) => {
	const [coverImage, setCoverImage] = useState(null);
	const [galleryTheme, setGalleryTheme] = useState(null);
	const [headerLayout, setHeaderLayout] = useState("default");
	const [isCoverImageUpdated, setIsCoverImageUpdated] = useState(false);

	const [openEditGalleryModal, setOpenEditGalleryModal] = useState(false);
	const closeEditGalleryModal = () => setOpenEditGalleryModal(false);

	const history = useHistory();
	const classes = useStyles();

	const defaultTheme = createTheme({
	});

	useEffect(async () => {
		if (props.gallery) {
			let selectedTheme = withDefault(props.gallery.theme, defaultTheme)
			setGalleryTheme(createTheme(selectedTheme));
			setHeaderLayout(props.gallery.headerLayout);
		}
	}, [props.gallery]);

	const handleDropzoneSubmit = async (file) => {
		setCoverImage(file);
	};

	const handleUpdateGallery = async (updatedMetadata) => {
		if (!isUserLoggedIn()) {
			return;
		}

		updatedMetadata.slug = convertToSlug(updatedMetadata.galleryName);
		updatedMetadata.theme = galleryTheme;
		updatedMetadata.headerLayout = headerLayout;

		if (isCoverImageUpdated) {
			const uploadResult = await uploadImageToMediaGallery(coverImage);
			updatedMetadata.coverImage = uploadResult.data[0];
		}

		setIsCoverImageUpdated(false);

		const updateResult = await updateGallery(props.gallery.id, updatedMetadata);

		if (updateResult.status === 200) {
			history.push(`/gallery/${updatedMetadata.slug}`);
			window.location.reload();
		}
	};

	return (
		<>
			{galleryTheme && (
				<ThemeProvider theme={galleryTheme}>
					<div className={classes.galleryContainer}>
						<GalleryHeader
							openEditGalleryModal={openEditGalleryModal}
							closeEditGalleryModal={closeEditGalleryModal}
							setOpenEditGalleryModal={setOpenEditGalleryModal}
							isOwner={props.isOwner}
							handleUpdateGallery={handleUpdateGallery}
							gallery={props.gallery}
							coverImage={coverImage}
							handleDropzoneSubmit={handleDropzoneSubmit}
							headerLayout={headerLayout}
							setHeaderLayout={setHeaderLayout}
							galleryTheme={galleryTheme}
							setGalleryTheme={setGalleryTheme}
							isCoverImageUpdated={isCoverImageUpdated}
							setIsCoverImageUpdated={setIsCoverImageUpdated}
							setShowAddAssetsView={props.setShowAddAssetsView}
							setShowRemoveAssetsView={props.setShowRemoveAssetsView}
						/>
						<GalleryNfts nfts={props.gallery.assets} slug={props.slug} />
						<EditGalleryModal
							openEditGalleryModal={openEditGalleryModal}
							closeEditGalleryModal={closeEditGalleryModal}
							headerLayout={headerLayout}
							setHeaderLayout={setHeaderLayout}
							galleryTheme={galleryTheme}
							setGalleryTheme={setGalleryTheme}
						/>
					</div>
				</ThemeProvider>
			)}
		</>
	);
};

export default Gallery;
