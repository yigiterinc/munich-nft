import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CustomTabs from "./CustomTabs";
import NftHeader from "./NftHeader";
import CollectionGroup from "./CollectionGroup";
import PriceField from "./PriceField";

const useStyles = makeStyles({
	nftDetailsPanel: {
		width: "20vw",
		marginLeft: "20px",
	},
});

const NftDetailsPanel = (nftJson) => {
	const classes = useStyles();

	return (
		<Grid
			xs={4}
			item={true}
			component="span"
			className={classes.nftDetailsPanel}
		>
			<NftHeader {...nftJson} />
			<CollectionGroup {...nftJson} />
			<PriceField {...nftJson} />
			<CustomTabs {...nftJson} />
		</Grid>
	);
};

export default NftDetailsPanel;
