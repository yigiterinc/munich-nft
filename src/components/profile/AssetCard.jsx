import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		minWidth: 200,
		minHeight: 450,
		height: "100%",
		cursor: "pointer",
	},
	image: {
		height: "30vh",
		objectFit: "contain",
	},
});

const AssetCard = ({ asset }) => {
	const classes = useStyles();

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
				<Typography variant="h5" component="h2">
					{asset.name}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default AssetCard;
