import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { Grid, Card, CardMedia } from "@material-ui/core";
import AssetCard from "../components/common/AssetCard";
import GalleryEditManager from "../components/gallery/GalleryEditManager";
import GalleryCoverImage from "../components/gallery/GalleryCoverImage";
import GalleryHeaderPanel from "../components/gallery/GalleryHeaderPanel";
import CircularSpinner from "../components/common/CircularSpinner";
import { fetchGallery } from "../api/strapi";
import { getLoggedInUser } from "../utils/auth-utils";

const useStyles = makeStyles({
	galleryContainer: {
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
	let { slug } = useParams();
	const currentUser = getLoggedInUser();
	const classes = useStyles();

	useEffect(async () => {
		const json = await fetchGallery(slug);
		let nfts = nftHelper(json.assets);
		let coverImageUrl = `http://localhost:1337${json.coverImage.url}`;
		const gallery = {
			name: json.galleryName,
			description: json.description,
			imageSrc: coverImageUrl,
			userId: json.userId,
			creator: json.username,
			nfts: nfts,
		};
		setGallery(gallery);
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
					handleDropzoneSubmit
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
	handleDropzoneSubmit
) => {
	return (
		<div className={classes.galleryContainer}>
			<GalleryEditManager
				isEditMode={isEditable}
				switchEditableMode={switchGalleryEditMode}
			/>
			{renderGalleryHeader(
				classes,
				galleryJson,
				switchGalleryEditMode,
				isEditable,
				isOwner,
				coverImage,
				handleDropzoneSubmit
			)}
			{renderNftsInGallery(classes, galleryJson.nfts)}
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
	handleDropzoneSubmit
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

export default Gallery;
