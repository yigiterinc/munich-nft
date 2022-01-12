import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider, makeStyles } from "@material-ui/core";
import { useParams, useHistory } from "react-router";
import CircularSpinner from "../components/common/CircularSpinner";
import { fetchGallery } from "../api/strapi";
import { getLoggedInUser, isUserLoggedIn } from "../utils/auth-utils";
import { uploadImageToMediaGallery, updateGallery } from "../api/strapi";
import { RECOMMENDED_THEMES } from "../themes/galleryThemes";
import RenderGallery from "../components/gallery/RenderGallery";

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

	const classes = useStyles();

	useEffect(async () => {
		const json = await fetchGallery(slug);
		let nfts = nftHelper(json.assets);
		let coverImageUrl = `http://localhost:1337${json.coverImage.url}`;
		const gallery = {
			userId: json.userId,
			creator: json.username,
			nfts: nfts,
		};
		setGalleryId(json.id);
		setGallery(gallery);
		setGalleryName(json.galleryName);
		setGalleryDescription(json.description);
		setCoverImage(coverImageUrl);
		if (currentUser.id === gallery.userId) {
			setIsOwner(true);
		}
		let theme = createTheme(RECOMMENDED_THEMES[0].theme);
		setGalleryTheme(theme);
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
		};

		const updateResult = await updateGallery(galleryId, changedParams);
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
							renderPage(
								classes,
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
			)}
		</>
	);
};

const nftHelper = (assets) => {
	let tmp = [];
	for (let i = 0; i < assets.length; i++) {
		tmp.push(assets[i]);
	}
	return tmp;
};

const renderPage = (
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
	setGalleryDescription,
	handleUpdateGallery,
	openGallerySettings,
	setOpenGallerySettings,
	galleryTheme,
	setGalleryTheme,
	theme
) => {
	return (
		<RenderGallery
			classes={classes}
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
