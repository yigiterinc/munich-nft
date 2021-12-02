import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		minWidth: 200,
		minHeight: 200,
		height: "auto",
		cursor: "pointer",
	},
	image: {
		height: "30vh",
	},
});

const AssetCard = ({ asset }) => {
	const contractAddressId = asset.asset_contract.address;
	const tokenId = asset.token_id;
	const path = `/token/${contractAddressId}/${tokenId}`;

	const classes = useStyles();

	const redirectToNftDetailsPage = () => {
		window.location.href = path;
	};

	return (
		<Card
			className={classes.root}
			variant="outlined"
			onClick={redirectToNftDetailsPage}
		>
			<CardMedia
				component="img"
				className={classes.image}
				image={asset.image_url}
				title={asset.name}
			/>
			<CardContent>
				<Typography variant="h6" color="textSecondary" gutterBottom>
					{asset.name}
				</Typography>
				<Typography variant="h6" component="h2">
					{asset.name}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default AssetCard;
