import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Filter from "../components/market/Filter";
import MarketItemPanel from "../components/market/MarketItemPanel";
import marketJson from "../dummy/dummyAssets.json";

const useStyles = makeStyles((theme) => ({
	marketContainer: {
		display: "flex",
		paddingTop: "2vw",
	},
	spinner: {
		position: "absolute",
		left: "50%",
		top: "50%",
	},
}));

const Market = () => {
	const classes = useStyles();
	const [listedNfts, setListedNfts] = useState(null);

	useEffect(() => {
		const fetchMarketData = () => {
			const assets = marketJson;

			setListedNfts(assets);
		};
		fetchMarketData();
	}, []);
	return (
		<>
			{listedNfts ? (
				renderMarketPage(classes, listedNfts)
			) : (
				<CircularProgress className={classes.spinner} />
			)}
		</>
	);
};

const renderMarketPage = (classes, listedNfts) => {
	return (
		<Container
			disableGutters
			maxWidth={false}
			className={classes.marketContainer}
		>
			<Grid item={true} xs={3}>
				<Filter />
			</Grid>
			<Grid item={true} xs={9}>
				<MarketItemPanel listedNfts={listedNfts} />
			</Grid>
		</Container>
	);
};

export default Market;
