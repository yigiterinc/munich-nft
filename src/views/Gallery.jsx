import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";
import RenderGallery from "../components/gallery/RenderGallery";
import { isUserLoggedIn } from "../utils/auth-utils";
import { convertToSlug, withDefault } from "../utils/commons";
import { updateGallery, uploadImageToMediaGallery } from "../api/strapi";
import { useHistory } from "react-router-dom";

const Gallery = (props) => {
	const [inEditMode, setInEditMode] = useState(false);
	const [coverImage, setCoverImage] = useState(null);
	const [galleryTheme, setGalleryTheme] = useState(null);
	const [headerLayout, setHeaderLayout] = useState("default");
	const [isCoverImageUpdated, setIsCoverImageUpdated] = useState(false);

	const history = useHistory();

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

	useEffect(async () => {
		if (props.gallery) {
			let selectedTheme = withDefault(props.gallery.theme, defaultTheme)
			setGalleryTheme(createTheme(selectedTheme));
			setHeaderLayout(props.gallery.headerLayout);
		}
	}, [props.gallery]);

	const switchEditableMode = () => {
		setInEditMode(!inEditMode);
	};

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
					{
							<RenderGallery
								slug={props.slug}
								gallery={props.gallery}
								switchEditableMode={switchEditableMode}
								inEditMode={inEditMode}
								isOwner={props.isOwner}
								coverImage={coverImage}
								handleDropzoneSubmit={handleDropzoneSubmit}
								handleUpdateGallery={handleUpdateGallery}
								galleryTheme={galleryTheme}
								setGalleryTheme={setGalleryTheme}
								headerLayout={headerLayout}
								setHeaderLayout={setHeaderLayout}
								isCoverImageUpdated={isCoverImageUpdated}
								setIsCoverImageUpdated={setIsCoverImageUpdated}
								setShowAddAssetsView={props.setShowAddAssetsView}
								setShowRemoveAssetsView={props.setShowRemoveAssetsView}
							/>
					}
				</ThemeProvider>
			)}
		</>
	);
};

export default Gallery;
