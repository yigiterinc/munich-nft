import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomTabs from "./CustomTabs";
import NftHeader from "./NftHeader";
import CollectionGroup from "./CollectionGroup";
import PriceField from "./PriceField";

const useStyles = makeStyles({
	nftDetailsPanel: {
		marginLeft: "20px",
	},
});

const NftDetailsPanel = (nftJson) => {
	const classes = useStyles();

	return (
		<div className={classes.nftDetailsPanel}>
			<NftHeader {...nftJson} />
			<CollectionGroup {...nftJson} />
			<PriceField {...nftJson} />
			<CustomTabs {...nftJson} />
		</div>
	);
};

export default NftDetailsPanel;
