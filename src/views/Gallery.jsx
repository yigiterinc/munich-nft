import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { useParams, useHistory } from "react-router";
import CircularSpinner from "../components/common/CircularSpinner";
import { fetchGallery } from "../api/strapi";
import { getLoggedInUser, isUserLoggedIn } from "../utils/auth-utils";
import { uploadImageToMediaGallery, updateGallery } from "../api/strapi";
import RenderGallery from "../components/gallery/RenderGallery";

const Gallery = () => {
	const [gallery, setGallery] = useState(null);
	const [isEditable, setIsEditable] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const [coverImage, setCoverImage] = useState(null);
	const [galleryId, setGalleryId] = useState(null);
	const [galleryName, setGalleryName] = useState("");
	const [galleryDescription, setGalleryDescription] = useState("");
	const [openGallerySettings, setOpenGallerySettings] = useState(false);
	const [galleryTheme, setGalleryTheme] = useState(null);

	let { slug } = useParams();
	const currentUser = getLoggedInUser();
	const history = useHistory();

	useEffect(async () => {
		const json = await fetchGallery(slug);
		let coverImageUrl = `http://localhost:1337${json.coverImage.url}`;
		const gallery = {
			userId: json.userId,
			creator: json.username,
			nfts: json.assets,
		};
		setGalleryId(json.id);
		setGallery(gallery);
		setGalleryName(json.galleryName);
		setGalleryDescription(json.description);
		setCoverImage(coverImageUrl);
		if (currentUser.id === gallery.userId) {
			setIsOwner(true);
		}
		setGalleryTheme(createTheme(json.theme));
	}, []);

	const switchGalleryEditMode = () => {
		setIsEditable(!isEditable);
	};
	const handleDropzoneSubmit = async (file) => {
		setCoverImage(file.preview);
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
		};

		const updateResult = await updateGallery(galleryId, changedParams);
	};

	const convertToSlug = (galleryName) => {
		return galleryName.toLowerCase().replaceAll(" ", "_");
	};

	return (
		<ThemeProvider theme={galleryTheme}>
			<>
				{gallery ? (
					renderPage(
						gallery,
						switchGalleryEditMode,
						isEditable,
						isOwner,
						coverImage,
						handleDropzoneSubmit,
						galleryName,
						galleryDescription,
						setGalleryName,
						setGalleryDescription,
						handleUpdateGallery,
						openGallerySettings,
						setOpenGallerySettings,
						galleryTheme,
						setGalleryTheme
					)
				) : (
					<CircularSpinner />
				)}
			</>
		</ThemeProvider>
	);
};

const renderPage = (
	galleryJson,
	switchGalleryEditMode,
	isEditable,
	isOwner,
	coverImage,
	handleDropzoneSubmit,
	galleryName,
	galleryDescription,
	setGalleryName,
	setGalleryDescription,
	handleUpdateGallery,
	openGallerySettings,
	setOpenGallerySettings,
	galleryTheme,
	setGalleryTheme
) => {
	return (
		<RenderGallery
			galleryJson={galleryJson}
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
			openGallerySettings={openGallerySettings}
			setOpenGallerySettings={setOpenGallerySettings}
			galleryTheme={galleryTheme}
			setGalleryTheme={setGalleryTheme}
		/>
	);
};

export default Gallery;
