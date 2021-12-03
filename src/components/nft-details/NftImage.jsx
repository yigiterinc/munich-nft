import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";

import marketplaceLogo from "../../assets/images/openseaLogo.png";
import { OPENSEA_BASE_URL } from "../../constants/openseaApiConstants";

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
	const [isLiked, setIsLiked] = useState(false);
	const toggleLikeButton = () => setIsLiked(!isLiked);

	return (
		<div className={classes.nftImageContainer}>
			{/* {renderHeader(classes, nftJson, isLiked, toggleLikeButton)} */}
			{renderNftImage(classes, nftJson)}
		</div>
	);
};

const renderHeader = (classes, nftJson) => {
	const contractAddressId = nftJson.contractAddressId;
	const tokenId = nftJson.tokenId;
	return (
		<CardActions className={classes.header}>
			<IconButton
				href={OPENSEA_BASE_URL + "/" + contractAddressId + "/" + tokenId}
				target="_blank"
				rel="noopener noreferrer"
				size="small"
				disableRipple
				disableFocusRipple
				className={classes.marketButton}
			>
				<img src={marketplaceLogo} alt="market-logo" height={25} width={25} />
			</IconButton>
		</CardActions>
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
