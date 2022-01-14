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

const Gallery = () => {
	const [gallery, setGallery] = useState(null);
	const [isEditable, setIsEditable] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const [coverImage, setCoverImage] = useState(null);
	const [galleryId, setGalleryId] = useState(null);
	const [galleryName, setGalleryName] = useState("");
	const [galleryDescription, setGalleryDescription] = useState("");
	const [galleryTheme, setGalleryTheme] = useState(null);
	const [headerLayout, setHeaderLayout] = useState("default");
	const [nftsLayout, setNftsLayout] = useState("default");

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
		if (Object.keys(json.theme).length === 0) {
			setGalleryTheme(createTheme(RECOMMENDED_THEMES[0].theme));
		} else {
			setGalleryTheme(createTheme(json.theme));
		}
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
			headerLayout: headerLayout,
			nftsLayout: nftsLayout,
		};

		const updateResult = await updateGallery(galleryId, changedParams);
	};

	const convertToSlug = (galleryName) => {
		return galleryName.toLowerCase().replaceAll(" ", "_");
	};

	return (
		<ThemeProvider theme={galleryTheme}>
			<>
				{console.log(headerLayout)}
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
						nftsLayout={nftsLayout}
						setNftsLayout={setNftsLayout}
					/>
				) : (
					<CircularSpinner />
				)}
			</>
		</ThemeProvider>
	);
};

export default Gallery;
