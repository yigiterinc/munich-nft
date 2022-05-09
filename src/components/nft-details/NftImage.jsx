import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	nftImageContainer: {
		width: "30vw",
		background: theme.palette.background.default,
	},
	image: ({ backgroundColor }) => ({
		height: "400px",
		width: "400px",
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
