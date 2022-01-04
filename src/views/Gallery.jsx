import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router";
import { Grid } from "@material-ui/core";
import GalleryEditManager from "../components/gallery/GalleryEditManager";
import GalleryCoverImage from "../components/gallery/GalleryCoverImage";
import GalleryHeaderPanel from "../components/gallery/GalleryHeaderPanel";
import CircularSpinner from "../components/common/CircularSpinner";
import { fetchGallery } from "../api/strapi";
import { getLoggedInUser, isUserLoggedIn } from "../utils/auth-utils";
import AssetCard from "../components/common/AssetCard";
import { CustomizableNftGrids } from "../components/gallery/CustomizableNftGrids";
import { uploadImageToMediaGallery, updateGallery } from "../api/strapi";

const useStyles = makeStyles({
	galleryContainer: {
		heigth: "4000px",
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
});

const Gallery = () => {
	const [gallery, setGallery] = useState(null);
	const [isEditable, setIsEditable] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const [coverImage, setCoverImage] = useState(null);
	const [galleryId, setGalleryId] = useState(null);
	const [galleryName, setGalleryName] = useState("");
	const [galleryDescription, setGalleryDescription] = useState("");
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
		console.log(updateResult);
	};

	const convertToSlug = (galleryName) => {
		return galleryName.toLowerCase().replaceAll(" ", "_");
	};

	return (
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
					handleUpdateGallery
				)
			) : (
				<CircularSpinner />
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
	handleUpdateGallery
) => {
	return (
		<div className={classes.galleryContainer}>
			<GalleryEditManager
				isEditMode={isEditable}
				switchEditableMode={switchGalleryEditMode}
				handleUpdateGallery={handleUpdateGallery}
			/>
			{renderGalleryHeader(
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
			)}
			{renderNftsInGallery(classes, galleryJson.nfts, isEditable, isOwner)}
		</div>
	);
};

const renderGalleryHeader = (
	classes,
	dummyGallery,
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
					json={dummyGallery}
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

export const renderNftsInGallery = (classes, nfts, isEditable, isOwner) => {
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

export default Gallery;
