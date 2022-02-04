import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
	nftImageContainer: {
		height: "60vh",
		width: "35vw",
		borderRadius: "10px",
		border: "1px solid rgb(229, 232, 235)",
		background: theme.palette.background.default,
	},
	header: {
		padding: "0.5vw",
		justifyContent: "flex-end",
	},
	marketButton: {
		marginRight: "auto",
		marginLeft: "0.15vw",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	image: ({ backgroundColor }) => ({
		height: "inherit",
		width: "inherit",
		objectFit: "contain",
		borderRadius: "inherit",
		backgroundColor: backgroundColor,
	}),
}));

const NftImage = (props) => {
	const backgroundColor = "#" + props.nftJson.backgroundColor;
	const classes = useStyles({ backgroundColor });

	return <>{renderNftImage(classes, props.nftJson)}</>;
};

const renderNftImage = (classes, nftJson) => {
	return (
		<Grid
			className={classes.nftImageContainer}
			container
			justifyContent="center"
		>
			<img src={nftJson.imageSrc} className={classes.image} />
		</Grid>
	);
};

export default NftImage;
