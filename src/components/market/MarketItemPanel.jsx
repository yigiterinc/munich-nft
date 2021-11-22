import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MarketItem from "../../components/market/MarketItem";

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
	const col = 4;
	const row = [];
	for (let i = 0; i < listedNfts.length; i += col) {
		row.push(
			<Grid container item xs={12} spacing={3} key={i}>
				{renderRows(classes, listedNfts.slice(i, i + col))}
			</Grid>
		);
	}
	return row;
};

export const renderRows = (classes, listedNfts) => {
	return (
		<>
			{listedNfts.map((item) => {
				return <MarketItem {...item} />;
			})}
		</>
	);
};

export default MarketItemPanel;
