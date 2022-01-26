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
	},
	image: {
		width: "100%",
		height: "auto",
	},
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
		fontSize: "20px",
	},
}));

const GalleryCard = ({ asset }) => {
	const contractAddressId = asset?.item?.asset_contract?.address;
	const tokenId = asset?.item?.token_id;
	const item = Object.keys(asset).includes("item") ? asset?.item : asset;

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
					<CardContent>
						<div className={classes.collectionSection}>
							<Link
								className={classes.collectionLink}
								to={`/collection/${asset.collection.slug}`}
							>
								{item.collection.name}
							</Link>
						</div>
						<Typography variant="h6" component="h2" className={classes.nftText}>
							{item.name ? item.name : "-"}
						</Typography>
					</CardContent>
				</Card>
			</Link>
		</div>
	);
};

export default GalleryCard;
