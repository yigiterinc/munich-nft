import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
	galleryCoverImageContainer: {
		borderRadius: "10px",
	},
});

const GalleryCoverImage = (galleryJson) => {
	const classes = useStyles();

	return (
		<Card className={classes.galleryCoverImageContainer}>
			<CardMedia component="img" src={galleryJson.imageSrc} />
		</Card>
	);
};

export default GalleryCoverImage;
