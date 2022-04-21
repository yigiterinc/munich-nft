import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	nftImageContainer: {
		width: "35vw",
		borderRadius: "10px",
		border: "1px solid rgb(229, 232, 235)",
		background: theme.palette.background.default,
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

	return (
		<Grid
			className={classes.nftImageContainer}
			container
			justifyContent="center"
		>
			<img src={props.nftJson.imageSrc} className={classes.image} />
		</Grid>
	);
};

export default NftImage;
