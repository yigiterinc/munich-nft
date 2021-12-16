import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardMedia, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		minWidth: 200,
		minHeight: 200,
		height: "auto",
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
});

const AssetCard = ({ asset }) => {
	const contractAddressId = asset.asset_contract.address;
	const tokenId = asset.token_id;

	const classes = useStyles();

	return (
		<Link
			className={classes.link}
			to={`/token/${contractAddressId}/${tokenId}`}
		>
			<Card className={classes.root} variant="outlined">
				<CardMedia
					component="img"
					className={classes.image}
					image={asset.image_url}
					title={asset.name}
				/>
				<CardContent>
					<Typography variant="h6" color="textSecondary" gutterBottom>
						{asset.collection.name}
					</Typography>
					<Typography variant="h6" component="h2">
						{asset.name ? asset.name : "-"}
					</Typography>
				</CardContent>
			</Card>
		</Link>
	);
};

export default AssetCard;
