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
		background: theme.palette.info.main,
		borderRadius: "10px",
	},
	image: {
		width: "100%",
		height: "auto",
	},
	collectionSection: {},
	collectionLink: {
		color: theme.palette.secondary.light,
		cursor: "pointer",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
		},
		fontSize: "14px",
		"&:hover": {
			color: theme.palette.primary.contrastText,
		},
	},
	nftText: {
		color: theme.palette.secondary.main,
		marginTop: "2vh",
		fontWeight: "bold",
		fontSize: "24px",
	},
	priceSection: {
		background: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	priceLabel: {
		lineSpacing: "1px",
		fontSize: "18px",
	},
	priceText: {
		paddingTop: "1vh",
	},
}));

const GalleryCard = ({ asset }) => {
	const contractAddressId = asset?.item?.asset_contract?.address;
	const tokenId = asset?.item?.token_id;
	const item = Object.keys(asset).includes("item") ? asset?.item : asset;
	const currentPrice = 0.1;
	console.log(item);
	const classes = useStyles();

	const defaultImagePath = "/images/no-image.png";
	return (
		<div className={classes.root}>
			<Link
				className={classes.link}
				to={`/token/${contractAddressId}/${tokenId}`}
			>
				<Card variant="outlined" className={classes.card}>
					<CardMedia
						component="img"
						className={classes.image}
						image={withDefault(item.image_url, defaultImagePath)}
						title={item.name}
					/>
					<CardContent className={classes.collectionSection}>
						<Link
							className={classes.collectionLink}
							to={`/collection/${asset.collection.slug}`}
						>
							{item.collection.name}
						</Link>

						<Typography variant="h6" component="h2" className={classes.nftText}>
							{item.name ? item.name : "-"}
						</Typography>
					</CardContent>
					{currentPrice ? (
						<CardContent className={classes.priceSection}>
							<>
								<div className={classes.priceLabel}>Current Price</div>
								<Typography
									variant="h6"
									component="h2"
									className={classes.priceText}
								>
									{currentPrice + " ETH"}
								</Typography>
							</>
						</CardContent>
					) : (
						<CardContent className={classes.cardContent}>
							<div className={classes.priceSection}>
								<Typography
									variant="h6"
									component="h2"
									className={classes.priceText}
								>
									Not listed yet
								</Typography>
							</div>
						</CardContent>
					)}
				</Card>
			</Link>
		</div>
	);
};

export default GalleryCard;
