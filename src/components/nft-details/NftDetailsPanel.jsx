import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CustomTabs from "./CustomTabs";
import NftDetailsHeader from "./NftDetailsHeader";
import StatisticsGroup from "./StatisticsGroup";

const useStyles = makeStyles({
	nftDetailsContainer: {
		width: "40vw",
		marginLeft: "20px",
	},
});

const NftDetailsPanel = (nftJson) => {
	const classes = useStyles();

	return (
		<Grid xs={5} className={classes.nftDetailsContainer}>
			<NftDetailsHeader {...nftJson} />
			<StatisticsGroup />
			<CustomTabs />
		</Grid>
	);
};

export default NftDetailsPanel;
