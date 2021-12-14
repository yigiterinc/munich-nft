import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
	nftImageContainer: {
		width: "512px",
		borderRadius: "10px",
		border: "1px solid rgb(229, 232, 235)",
	},
	header: {
		padding: "0.5vw",
		justifyContent: "flex-end",
	},
	marketButton: {
		marginRight: "auto",
		marginLeft: "0.15vw",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
});

const NftImage = (nftJson) => {
	const classes = useStyles();

	return (
		<div className={classes.nftImageContainer}>
			{renderNftImage(classes, nftJson)}
		</div>
	);
};

const renderNftImage = (classes, nftJson) => {
	const backgroundColor = "#" + nftJson.backgroundColor;
	return (
		<Grid container justifyContent="center">
			<Card style={{ backgroundColor }} className={classes.nftImage}>
				<CardMedia component="img" src={nftJson.imageSrc} />
			</Card>
		</Grid>
	);
};

export default NftImage;
