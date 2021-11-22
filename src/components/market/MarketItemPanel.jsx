import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import AssetCard from "../../components/profile/AssetCard";

const useStyles = makeStyles((theme) => ({
	filterDiv: {
		border: "1 px solid black",
	},
	spinner: {},
}));

const MarketItemPanel = (listedNfts) => {
	const classes = useStyles();
	return <>{renderMarketItems(classes, listedNfts.listedNfts)}</>;
};

export const renderMarketItems = (classes, listedNfts) => {
	return (
		<Grid container spacing={1} justifyContent="flex-start">
			{renderGrids(classes, listedNfts)}
		</Grid>
	);
};

export const renderGrids = (classes, listedNfts) => {
	const row = [];
	for (let i = 0; i < listedNfts.length; i += 4) {
		row.push(
			<Grid container item xs={12} spacing={3} key={i}>
				{renderRows(classes, listedNfts.slice(i, i + 4))}
			</Grid>
		);
	}
	return row;
};

export const renderRows = (classes, listedNfts) => {
	return (
		<>
			{listedNfts.map((item) => {
				return (
					<Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
						<AssetCard asset={item} />
					</Grid>
				);
			})}
		</>
	);
};

export default MarketItemPanel;
