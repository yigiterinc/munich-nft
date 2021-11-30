import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
	galleryCoverImageContainer: {
		width: "400px",
		borderRadius: "10px",
		border: "1px solid rgb(229, 232, 235)",
	},
});
const GalleryCoverImage = (galleryJson) => {
	const classes = useStyles();

	return (
		<div className={classes.galleryCoverImageContainer}>
			{renderGalleryCoverImage(classes, galleryJson)}
		</div>
	);
};

const renderGalleryCoverImage = (classes, galleryJson) => {
	return (
		<Grid container justifyContent="center">
			<Card className={classes.galleryCoverImage}>
				<CardMedia component="img" src={galleryJson.imageSrc} />
			</Card>
		</Grid>
	);
};

export default GalleryCoverImage;
