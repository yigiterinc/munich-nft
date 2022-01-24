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
import { RECOMMENDED_THEMES } from "../themes/galleryThemes";

const Gallery = ({
	setGalleryData,
	setShowAddAssetsView,
	setShowRemoveAssetsView,
}) => {
	const [gallery, setGallery] = useState(null);
	const [isEditable, setIsEditable] = useState(false);
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
		const json = await fetchGallery(slug);
		const gallery = {
			userId: json.userId,
			creator: json.username,
			nfts: json.assets,
		};
		const selectedTheme =
			json.theme === undefined ? RECOMMENDED_THEMES[0].theme : json.theme;

		setGalleryId(json.id);
		setGallery(gallery);
		setGalleryName(json.galleryName);
		setGalleryDescription(json.description);
		setCoverImage(json.coverImage);
		setGalleryData({ galleryId: json.id, nfts: gallery.nfts, slug: slug });
		if (currentUser.id === gallery.userId) setIsOwner(true);
		setGalleryTheme(createTheme(selectedTheme));
		setHeaderLayout(json.headerLayout);
	}, [slug]);

	const switchGalleryEditMode = () => {
		setIsEditable(!isEditable);
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
		<ThemeProvider theme={galleryTheme}>
			<>
				{gallery ? (
					<RenderGallery
						galleryJson={gallery}
						switchGalleryEditMode={switchGalleryEditMode}
						isEditable={isEditable}
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
	);
};

export default Gallery;
