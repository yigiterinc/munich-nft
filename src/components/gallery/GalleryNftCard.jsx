import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardMedia, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withDefault } from "../../utils/commons";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: "none",
	},
	root: {
		maxWidth: "350px",
		maxHeight: "300px",
		cursor: "pointer",
		transition: "all 0.2s ease-out",
		"&:hover": {
			transform: "scale(1.05)",
			boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
			borderRadius: "150%"
		},
	},
	card: {
		background: theme.palette.background.default,
		borderRadius: "10px",
	},
	image: {
		minWidth: "350px",
		maxWidth: "350px",
		maxHeight: "300px",
		minHeight: "300px",
		objectFit: "cover"
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
		marginTop: "1vh",
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
	chainLogo: {
		marginLeft: "auto",
		height: "25px",
		width: "25px"
	},
	nameLogoContainer: {
		display: "flex",
		alignItems: "center"
	}
}));

const GalleryNftCard = (props) => {
	let asset = props.asset;

	const importedAsAsset = Object.keys(asset).includes("item");

	const contractAddressId = importedAsAsset ? asset?.item?.asset_contract?.address : asset.asset_contract.address;
	const tokenId = importedAsAsset ? asset?.item?.token_id : asset.token_id;
	const mint = asset?.mint;
	const item = Object.keys(asset).includes("item") ? asset?.item : asset;
	const defaultImagePath = "/images/no-image.png";
	const currentPrice = null; // dummy -> asset does not contain price info

	const CollectionSection = () => {
		if (asset.blockchain === "Ethereum") {
			return (
				<Link
					className={classes.collectionLink}
					to={`/collection/${asset.collection.slug}`}
				>
					{item.collection.name}
				</Link>
			)
		} else if (asset.blockchain === "Solana") {
			return (
				<Typography>
					{item.symbol}
				</Typography>
			)
		}
	}

	const ChainLogo = () => {
		if (asset?.blockchain === "Solana") {
			return <Avatar className={classes.chainLogo} alt="Sol" src="/images/sol_logo.png" />
		} else if (asset?.blockchain === "Ethereum") {
			return <Avatar className={classes.chainLogo} alt="Eth" src="/images/eth_logo.png" />
		}
	}

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
						{
							<CollectionSection/>
						}
						<div className={classes.nameLogoContainer}>
							<Typography variant="h6" component="h2" className={classes.nftText}>
								{item.name ? item.name : "-"}
							</Typography>

							<ChainLogo/>
						</div>
					</CardContent>
				</Card>
			</Link>
		</div>
	);
};

export default GalleryNftCard;
