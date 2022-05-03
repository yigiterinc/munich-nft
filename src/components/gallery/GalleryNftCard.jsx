import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardMedia, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withDefault } from "../../utils/commons";

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: "none",
	},
	root: {
		width: "100%",
		height: "100%",
		cursor: "pointer",
		transition: "all 0.2s ease-out",
		"&:hover": {
			transform: "scale(1.05)",
			boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
		},
	},
	card: {
		background: theme.palette.background.default,
		borderRadius: "10px",
	},
	image: {
		width: "100%",
		height: "auto",
	},
	collectionSection: {},
	collectionLink: {
		color: theme.palette.primary.main,
		cursor: "pointer",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
		},
		"&:hover": {
			fontWeight: "bold",
		},
		fontSize: "14px",
	},
	nftText: {
		color: theme.palette.text.primary,
		marginTop: "2vh",
		fontWeight: "bold",
		fontSize: "24px",
	},
	priceSection: {
		background: theme.palette.text.primary,
		color: theme.palette.primary.contrastText,
		height: "50px",
	},
	priceLabel: {
		lineSpacing: "1px",
		fontSize: "18px",
	},
	priceText: {
		paddingTop: "1vh",
	},
}));

const GalleryNftCard = (props) => {
	let asset = props.asset;
	console.log(asset);

	const contractAddressId = asset?.item?.asset_contract?.address;
	const tokenId = asset?.item?.token_id;
	const mint = asset?.mint;
	const item = Object.keys(asset).includes("item") ? asset?.item : asset;
	const defaultImagePath = "/images/no-image.png";
	const currentPrice = null; // dummy -> asset does not contain price info

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Link
				className={classes.link}
				to={
					mint
						? `/sol-token/${mint}`
						: `/eth-token/${contractAddressId}/${tokenId}`
				}
			>
				<Card variant="outlined" className={classes.card}>
					<CardMedia
						component="img"
						className={classes.image}
						image={withDefault(item.image_url || item.image, defaultImagePath)}
						title={item.name}
					/>
					<CardContent className={classes.collectionSection}>
						{item.collection && (
							<Link
								className={classes.collectionLink}
								to={`/collection/${asset.collection.slug}`}
							>
								{item.collection.name}
							</Link>
						)}
						<Typography variant="h6" component="h2" className={classes.nftText}>
							{item.name ? item.name : "-"}
						</Typography>
					</CardContent>
					{currentPrice ? (
						<CardContent className={classes.priceSection}>
							<div className={classes.priceLabel}>Current Price</div>
							<Typography
								variant="h6"
								component="h2"
								className={classes.priceText}
							>
								{currentPrice + " ETH"}
							</Typography>
						</CardContent>
					) : (
						<CardContent className={classes.priceSection}>
							<Typography
								variant="h6"
								component="h2"
								className={classes.priceText}
							>
								Not listed yet
							</Typography>
						</CardContent>
					)}
				</Card>
			</Link>
		</div>
	);
};

export default GalleryNftCard;
