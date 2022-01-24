import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardMedia, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withDefault } from "../../utils/commons";

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.info.main,
		cursor: "pointer",
		transition: "all 0.2s ease-out",
		"&:hover": {
			transform: "scale(1.05)",
			boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
		},
	},
	image: {
		height: "30vh",
	},
	link: {
		textDecoration: "none",
	},
	collectionText: {
		color: theme.palette.secondary.light,
	},
	nftText: {
		color: theme.palette.secondary.main,
	},
}));

const GalleryCard = ({ asset, priorNft }) => {
	const contractAddressId = asset?.item?.asset_contract?.address;
	const tokenId = asset?.item?.token_id;
	const item = Object.keys(asset).includes("item") ? asset?.item : asset;

	const classes = useStyles();

	const defaultImagePath = "/images/no-image.png";

	return (
		<Link
			className={classes.link}
			to={`/token/${contractAddressId}/${tokenId}`}
		>
			<Card className={classes.root} variant="outlined">
				<>
					{priorNft ? (
						<CardMedia
							component="img"
							className={classes.priorImage}
							image={withDefault(item.image_url, defaultImagePath)}
							title={item.name}
						/>
					) : (
						<CardMedia
							component="img"
							className={classes.image}
							image={withDefault(item.image_url, defaultImagePath)}
							title={item.name}
						/>
					)}
				</>
				<CardContent>
					<Typography
						variant="h6"
						className={classes.collectionText}
						gutterBottom
					>
						{item.collection.name}
					</Typography>
					<Typography variant="h6" component="h2" className={classes.nftText}>
						{item.name ? item.name : "-"}
					</Typography>
				</CardContent>
			</Card>
		</Link>
	);
};

export default GalleryCard;
