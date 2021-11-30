import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AssetCard from "../components/common/AssetCard";
import Container from "@material-ui/core/Container";
import GalleryCoverImage from "../components/gallery/GalleryCoverImage";
import GalleryHeaderPanel from "../components/gallery/GalleryHeaderPanel";
import CircularSpinner from "../components/common/CircularSpinner";
import dummyNFTs from "../dummy/dummyAssets.json";

const useStyles = makeStyles({
	galleryContainer: {
		paddingTop: "2vw",
	},
	galleryHeaderContainer: {
		display: "flex",
	},
	nftContainer: {
		paddingTop: "4vw",
	},
	gridContainer: {
		display: "flex",
		paddingTop: "3vw",
		paddingLeft: "10vw",
		paddingRight: "10vw",
	},
});

const Gallery = () => {
	let dummyGallery = {
		imageSrc:
			"https://www.onyilhediyelik.com/wp-content/uploads/2017/03/portfolio_09-400x400.png",
		name: "Crypto Kitties Gallery",
		creator: "Cemal",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium neque eget eros elementum tempus. Cras in mattis tortor. Praesent dignissim sem vel placerat vulputate. Aenean ac nibh purus. Nulla efficitur ante ut ligula pharetra dictum. Nunc dictum neque quam, vel fermentum enim tincidunt eleifend. Sed tristique suscipit neque, sit amet pharetra nisl venenatis sed. Donec mauris dui, lobortis vitae nulla sed, suscipit euismod nisi. Integer ornare mollis mollis.",
	};
	const classes = useStyles();

	return (
		<>
			{dummyGallery ? (
				renderEntirePage(classes, dummyGallery)
			) : (
				<CircularSpinner />
			)}
		</>
	);
};

const renderEntirePage = (classes, galleryJson) => {
	return (
		<div className={classes.galleryContainer}>
			{renderGalleryHeader(classes, galleryJson)}
			{renderNftContainer(classes, dummyNFTs)}
		</div>
	);
};

const renderGalleryHeader = (classes, dummyGallery) => {
	return (
		<Container className={classes.galleryHeaderContainer}>
			<Grid item={true} xs={4}>
				<GalleryCoverImage {...dummyGallery} />
			</Grid>
			<Grid item={true} xs={7}>
				<GalleryHeaderPanel {...dummyGallery} />
			</Grid>
			<Grid item={true} xs={1} />
		</Container>
	);
};

const renderNftContainer = (classes, dummyNFTs) => {
	return (
		<Container className={classes.nftContainer}>
			<Grid item={true} xs={1} />
			{renderNfts(classes, dummyNFTs)}
			<Grid item={true} xs={1} />
		</Container>
	);
};

export const renderNfts = (classes, nfts) => {
	return <Container>{renderGrids(classes, nfts)}</Container>;
};

export const renderGrids = (classes, nfts) => {
	const row = [];
	for (let i = 0; i < nfts.length; i += 4) {
		row.push(
			<Grid container item xs={12} spacing={6} key={i}>
				{renderRows(classes, nfts.slice(i, i + 4))}
			</Grid>
		);
	}
	return row;
};

export const renderRows = (classes, nfts) => {
	return (
		<>
			{nfts.map((item) => {
				return (
					<Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
						<AssetCard asset={item} />
					</Grid>
				);
			})}
		</>
	);
};

export default Gallery;