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

const NftDetailsPanel = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.nftDetailsPanel}>
			<NftHeader nftJson={props.nftJson} />
			<CollectionGroup nftJson={props.nftJson} />
			<PriceField nftJson={props.nftJson} />
			<CustomTabs nftJson={props.nftJson} />
		</div>
	);
};

export default NftDetailsPanel;
