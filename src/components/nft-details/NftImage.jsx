import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

import marketplaceLogo from "../../assets/images/openseaLogo.png";
import { OPENSEA_NFT_BASE_URL } from "../../constants/openseaApiConstants";

const useStyles = makeStyles({
	nftImageContainer: {
		width: "508px",
		borderRadius: "10px",
		border: "1px solid rgb(229, 232, 235)",
		overflow: "hidden",
	},
	header: {
		padding: "0.5vw",
		justifyContent: "flex-end",
	},
	likeButtonContainer: {
		display: "flex",
		alignItems: "center",
	},
	likeButton: {
		marginRight: "0.1vw",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	marketButton: {
		marginRight: "auto",
		marginLeft: "0.15vw",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	likeText: {
		marginRight: "0.5vw",
	},
});

const NftImage = (nftJson) => {
	const classes = useStyles();
	const [isLiked, setIsLiked] = useState(false);
	const toggleLikeButton = () => setIsLiked(!isLiked);

	return (
		<div className={classes.nftImageContainer}>
			{renderHeader(classes, nftJson, isLiked, toggleLikeButton)}
			{renderNftImage(classes, nftJson)}
		</div>
	);
};

const renderHeader = (classes, nftJson, isLiked, toggleLikeButton) => {
	const contractAddressId = nftJson.contractAddressId;
	const tokenId = nftJson.tokenId;
	return (
		<CardActions className={classes.header}>
			<IconButton
				href={OPENSEA_NFT_BASE_URL + "/" + contractAddressId + "/" + tokenId}
				target="_blank"
				rel="noopener noreferrer"
				size="small"
				disableRipple
				disableFocusRipple
				className={classes.marketButton}
			>
				<img src={marketplaceLogo} alt="market-logo" height={25} width={25} />
			</IconButton>

			<div className={classes.likeButtonContainer}>
				{isLiked ? (
					<IconButton
						size="small"
						aria-label="fav-button"
						className={classes.likeButton}
					>
						<FavoriteIcon
							onClick={() => {
								toggleLikeButton();
							}}
							color="secondary"
						/>
					</IconButton>
				) : (
					<IconButton
						size="small"
						aria-label="fav-button"
						className={classes.likeButton}
						onClick={() => {
							toggleLikeButton();
						}}
					>
						<FavoriteBorderIcon color="secondary" />
					</IconButton>
				)}
				<Typography className={classes.likeText}>0</Typography>
			</div>
		</CardActions>
	);
};

const renderNftImage = (classes, nftJson) => {
	const backgroundColor = "#" + nftJson.backgroundColor;
	return (
		<Grid container justifyContent="center" className={classes.imageContainer}>
			<Card style={{ backgroundColor }}>
				<CardMedia component="img" src={nftJson.imageSrc} />
			</Card>
		</Grid>
	);
};

export default NftImage;
