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
	nftCardContainer: {
		width: "508px",
		borderRadius: "10px",
		border: "1px solid rgb(229, 232, 235)",
		overflow: "hidden",
	},
	headerContainer: {
		padding: "0.5vw",
		justifyContent: "flex-end",
	},
	likeButtonPanel: {
		display: "flex",
		alignItems: "center",
	},
	marketButton: {
		marginRight: "auto",
		paddingRight: "0.2vw",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	likeButton: {
		marginRight: "0.1vw",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	likeCount: {
		marginRight: "0.5vw",
	},
});

const NftImagePanel = (nftJson) => {
	const classes = useStyles();
	const [isLiked, setIsLiked] = useState(false);
	const toggleLikeButton = () => setIsLiked(!isLiked);

	return (
		<>
			<Grid className={classes.nftGridContainer}>
				<div className={classes.nftCardContainer}>
					{renderNftHeader(classes, nftJson, isLiked, toggleLikeButton)}
					{renderNftImage(classes, nftJson.imageSrc)}
				</div>
			</Grid>
		</>
	);
};

const renderNftHeader = (classes, nftJson, isLiked, func) => {
	let contractAddressId = nftJson.contractAddressId;
	let tokenId = nftJson.tokenId;
	return (
		<CardActions className={classes.headerContainer}>
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

			<div className={classes.likeButtonPanel}>
				{isLiked ? (
					<IconButton
						size="small"
						aria-label="fav-button"
						className={classes.likeButton}
					>
						<FavoriteIcon
							onClick={() => {
								func();
							}}
							color="secondary"
						/>
					</IconButton>
				) : (
					<IconButton
						size="small"
						aria-label="fav-button"
						className={classes.likeButton}
					>
						<FavoriteBorderIcon
							onClick={() => {
								func();
							}}
							color="secondary"
						/>
					</IconButton>
				)}
				<Typography className={classes.likeCount}>0</Typography>
			</div>
		</CardActions>
	);
};

const renderNftImage = (classes, imageSrc) => {
	return (
		<Grid container justifyContent="center" className={classes.imageContainer}>
			<Card>
				<CardMedia component="img" src={imageSrc} />
			</Card>
		</Grid>
	);
};

export default NftImagePanel;
