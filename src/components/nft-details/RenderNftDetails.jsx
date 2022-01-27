import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

import NftImage from "./NftImage";
import NftDetailsPanel from "./NftDetailsPanel";

const useStyles = makeStyles((theme) => ({
	nftDetailsContainer: {
		display: "flex",
		paddingTop: "2vw",
		background: theme.palette.background.default,
	},
}));

const RenderNftDetails = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.nftDetailsContainer}>
			<Grid item={true} xs={1} />
			<Grid item={true} xs={5}>
				<NftImage nftJson={props.nftJson} />
			</Grid>
			<Grid item={true} xs={6}>
				<NftDetailsPanel nftJson={props.nftJson} />
			</Grid>
		</div>
	);
};

export default RenderNftDetails;
