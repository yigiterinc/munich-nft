import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
	nftImageContainer: {
		width: "512px",
		height: "512px",
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
	nftImage: {
		margin: "auto",
	},
}));

const NftImage = (props) => {
	const classes = useStyles();

	return <>{renderNftImage(classes, props.nftJson)}</>;
};

const renderNftImage = (classes, nftJson) => {
	const backgroundColor = "#" + nftJson.backgroundColor;
	return (
		<Grid
			className={classes.nftImageContainer}
			container
			justifyContent="center"
		>
			<Box style={{ backgroundColor }} className={classes.nftImage}>
				<img src={nftJson.imageSrc} />
			</Box>
		</Grid>
	);
};

export default NftImage;
