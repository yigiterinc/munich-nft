import React from "react";
import Grid from "@material-ui/core/Grid";
import AssetCard from "../common/AssetCard";

const MarketItem = (item) => {
	let dummyPrice = 1;
	return (
		<Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
			<AssetCard asset={item} price={dummyPrice} />
		</Grid>
	);
};

export default MarketItem;
