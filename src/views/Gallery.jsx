import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import Grid from "@material-ui/core/Grid";
import AssetCard from "../components/common/AssetCard";
import GalleryCoverImage from "../components/gallery/GalleryCoverImage";
import GalleryHeaderPanel from "../components/gallery/GalleryHeaderPanel";
import CircularSpinner from "../components/common/CircularSpinner";
import { fetchGallery } from "../api/strapi";

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
	let { slug } = useParams();
	const classes = useStyles();

	useEffect(async () => {
		const json = await fetchGallery(slug);
		console.log(json.coverImage.url);
		let nfts = nftHelper(json.assets);
		let coverImageUrl = `http://localhost:1337${json.coverImage.url}`;
		const gallery = {
			name: json.galleryName,
			description: json.description,
			imageSrc: coverImageUrl,
			userId: json.userId,
			creator: json.assets[0].creator.user.username,
			walletAddress: json.assets[0].creator.address,
			nfts: nfts,
		};
		setGallery(gallery);
	}, []);

	return <>{gallery ? renderPage(classes, gallery) : <CircularSpinner />}</>;
};

const nftHelper = (assets) => {
	let tmp = [];
	for (let i = 0; i < assets.length; i++) {
		tmp.push(assets[i]);
	}
	return tmp;
};

const renderPage = (classes, galleryJson) => {
	return (
		<div className={classes.galleryContainer}>
			{renderGalleryHeader(classes, galleryJson)}
			{renderNftsInGallery(classes, galleryJson.nfts)}
		</div>
	);
};

const renderGalleryHeader = (classes, dummyGallery) => {
	return (
		<Grid container spacing={6} className={classes.galleryHeaderContainer}>
			<Grid item lg={5} md={5} sm={6} xs={8}>
				<GalleryCoverImage {...dummyGallery} />
			</Grid>
			<Grid item lg={7} md={7} sm={6} xs={4}>
				<GalleryHeaderPanel {...dummyGallery} />
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
