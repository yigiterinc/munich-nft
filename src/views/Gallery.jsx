import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { createTheme, ThemeProvider } from "@material-ui/core";
import CircularSpinner from "../components/common/CircularSpinner";
import RenderGallery from "../components/gallery/RenderGallery";
import { getLoggedInUser, isUserLoggedIn } from "../utils/auth-utils";
import {
	fetchGallery,
	updateGallery,
	uploadImageToMediaGallery,
} from "../api/strapi";

const Gallery = ({
	setShowAddAssetsView,
	setShowRemoveAssetsView,
}) => {
	const [gallery, setGallery] = useState(null);
	const [inEditMode, setInEditMode] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const [coverImage, setCoverImage] = useState(null);
	const [galleryId, setGalleryId] = useState(null);
	const [galleryName, setGalleryName] = useState("");
	const [galleryDescription, setGalleryDescription] = useState("");
	const [galleryTheme, setGalleryTheme] = useState(null);
	const [headerLayout, setHeaderLayout] = useState("default");
	const [isCoverImageUpdated, setIsCoverImageUpdated] = useState(false);

	let { slug } = useParams();
	const currentUser = getLoggedInUser();
	const history = useHistory();

	useEffect(async () => {
		if (!slug) return;

		const gallery = await fetchGallery(slug);

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
		let selectedTheme = gallery.theme === undefined ? defaultTheme : gallery.theme;

		if (!currentUser) {
			setIsOwner(false);
		} else if (currentUser?.id === gallery.userId) {
			setIsOwner(true);
		}

		setGalleryId(gallery.id);
		setGallery(gallery);
		setGalleryName(gallery.galleryName);
		setGalleryDescription(gallery.description);
		setCoverImage(gallery.coverImage);
		console.log(gallery);
		setGallery(gallery);
		setGalleryTheme(createTheme(selectedTheme));
		setHeaderLayout(gallery.headerLayout);
	}, [slug]);

	const switchEditableMode = () => {
		setInEditMode(!inEditMode);
	};

	const handleDropzoneSubmit = async (file) => {
		setCoverImage(file);
	};

	const handleUpdateGallery = async () => {
		if (!isUserLoggedIn()) {
			history.push("/");
			return;
		}

		const changedParams = {
			galleryName,
			description: galleryDescription,
			slug: convertToSlug(galleryName),
			theme: galleryTheme,
			headerLayout: headerLayout,
		};

		history.push(`${convertToSlug(galleryName)}`);

		if (isCoverImageUpdated) {
			const uploadResult = await uploadImageToMediaGallery(coverImage);
			const imageIdentifier = uploadResult.data[0];

			changedParams.coverImage = imageIdentifier;
		}

		setIsCoverImageUpdated(false);

		const updateResult = await updateGallery(galleryId, changedParams);

		if (updateResult.status === 200) {
			history.push(`/gallery/${changedParams.slug}`);
			window.location.reload();
		}
	};

	const convertToSlug = (galleryName) => {
		return galleryName.toLowerCase().replaceAll(" ", "_");
	};
	return (
		<>
			{galleryTheme && (
				<ThemeProvider theme={galleryTheme}>
					<>
						{gallery ? (
							<RenderGallery
								slug={slug}
								gallery={gallery}
								switchEditableMode={switchEditableMode}
								isEditable={inEditMode}
								isOwner={isOwner}
								coverImage={coverImage}
								handleDropzoneSubmit={handleDropzoneSubmit}
								galleryName={galleryName}
								galleryDescription={galleryDescription}
								setGalleryName={setGalleryName}
								setGalleryDescription={setGalleryDescription}
								handleUpdateGallery={handleUpdateGallery}
								galleryTheme={galleryTheme}
								setGalleryTheme={setGalleryTheme}
								headerLayout={headerLayout}
								setHeaderLayout={setHeaderLayout}
								isCoverImageUpdated={isCoverImageUpdated}
								setIsCoverImageUpdated={setIsCoverImageUpdated}
								setShowAddAssetsView={setShowAddAssetsView}
								setShowRemoveAssetsView={setShowRemoveAssetsView}
							/>
						) : (
							<CircularSpinner />
						)}
					</>
				</ThemeProvider>
			)}
		</>
	);
};

export default Gallery;
