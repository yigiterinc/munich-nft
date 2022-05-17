import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	nftImageContainer: {
		display: "flex",
		height: "500px",
		width: "500px",
		background: theme.palette.background.default,
	},
	image: ({ backgroundColor }) => ({
		height: "500px",
		width: "500px",
		objectFit: "cover",
		backgroundColor: backgroundColor,
	}),
}));

const NftImage = (props) => {
	const backgroundColor = "#" + props.nftJson.backgroundColor;
	const classes = useStyles({ backgroundColor });

	return (
		<div>
			<Card className={classes.nftImageContainer}>
				<CardMedia
					component="img"
					className={classes.image}
					src={props.nftJson.imageSrc}
				></CardMedia>
			</Card>
		</div>
	);
};

export default NftImage;
