import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
	},
	title: {
		margin: 40,
	},
}));

function ListNft({ resetButton }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography className={classes.title} variant="h5">
				List NFT
			</Typography>
			{resetButton}
		</div>
	);
}

export default ListNft;
