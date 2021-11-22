import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Icon } from "@iconify/react";

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
	priceBox: {
		display: "flex",
		alignItems: "center",
	},
});

const AssetCard = ({ asset, price }) => {
	const classes = useStyles();
	console.log(price);
	return (
		<Card className={classes.root} variant="outlined" onClick={() => {}}>
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
					{asset.name}
				</Typography>
				{price ? (
					<div className={classes.priceBox}>
						<Icon icon="mdi:ethereum" width="36" height="36" />
						<Typography className={classes.price}>{price}</Typography>
					</div>
				) : (
					<div />
				)}
			</CardContent>
		</Card>
	);
};

export default AssetCard;
