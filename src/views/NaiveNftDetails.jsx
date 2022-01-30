import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { fetchSingleAsset } from "../api/opensea";
import { getCurrentCryptoPriceInCurrency } from "../api/currencyHelper";
import { formatOpenseaPrice } from "../utils/currency-utils";

import RenderNftDetails from "../components/nft-details/RenderNftDetails";
import withSpinner from "../components/common/WithSpinner";

const useStyles = makeStyles({
	nftDetailsContainer: {
		display: "flex",
		paddingTop: "2vw",
	},
});

const NaiveNftDetails = () => {
	const [nftJson, setNftJson] = useState(null);
	const { contractAddressId, tokenId } = useParams();
	const [dataIsLoading, setDataIsLoading] = useState(true);

	useEffect(() => {
		if (nftJson) {
			setDataIsLoading(false);
		}
	}, [nftJson]);

	useEffect(async () => {
		const fetchData = async () => {
			const tokenData = await fetchSingleAsset(contractAddressId, tokenId);
			const ethPrice = await getCurrentCryptoPriceInCurrency("ETH", "USD");
			let listedPrice = null;
			if (tokenData.orders.length !== 0) {
				listedPrice = formatOpenseaPrice(tokenData.orders[0].current_price);
			}
			let json = {
				name: tokenData.name,
				imageSrc: tokenData.image_url,
				backgroundColor: tokenData.background_color,
				description: tokenData.description,
				owner: tokenData.owner.address,
				collection: tokenData.collection.name,
				slug: tokenData.collection.slug,
				tokenStandard: tokenData.asset_contract.schema_name,
				contractAddressId,
				tokenId,
				properties: tokenData.traits,
				collectionSize: tokenData.collection.stats.count,
				price: listedPrice,
				priceUsd: listedPrice * ethPrice,
			};

			setNftJson(json);
		};
		fetchData();
	}, [contractAddressId, tokenId]);

	const defaultTheme = createTheme({
		palette: {
			background: {
				default: "#fff",
			},
			text: {
				primary: "#000",
			},
			primary: {
				main: "#000",
				contrastText: "#fff",
			},
		},
	});

	return (
		<>
			{withSpinner(renderPage(nftJson, defaultTheme), dataIsLoading, {
				position: "absolute",
				left: "50%",
				top: "50%",
			})}
		</>
	);
};

const renderPage = (nftJson, defaultTheme) => {
	return (
		<ThemeProvider theme={defaultTheme}>
			<RenderNftDetails nftJson={nftJson} />;
		</ThemeProvider>
	);
};

export default NaiveNftDetails;
