import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

import NftImage from "./NftImage";
import CustomTabs from "./CustomTabs";
import NftHeader from "./NftHeader";
import CollectionGroup from "./CollectionGroup";
import PriceField from "./PriceField";

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.background.default,
	},
	nftDetailsContainer: {
		display: "flex",
		paddingTop: "2vw",
		width: "88vw",
		maxWidth: "1552px",
		margin: "auto",
		height: "100vh",
	},
	nftDetailsPanel: {
		marginLeft: "20px",
	},
}));

const RenderNftDetails = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.nftDetailsContainer}>
				<Grid item xs={1} />
				<Grid item xs={5}>
					<NftImage nftJson={props.nftJson} />
				</Grid>
				<Grid item xs={6} className={classes.nftDetailsPanel}>
					<NftHeader nftJson={props.nftJson} />
					<CollectionGroup nftJson={props.nftJson} />
					<PriceField nftJson={props.nftJson} />
					<CustomTabs nftJson={props.nftJson} />
				</Grid>
			</div>
		</div>
	);
};

export default RenderNftDetails;
