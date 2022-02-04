import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@material-ui/core";

import RenderNftDetails from "../components/nft-details/RenderNftDetails";
import withSpinner from "../components/common/WithSpinner";
import { fetchSolNftMetadata, getSolNftDetailsFromUri } from "../api/sol";

const useStyles = makeStyles({
	nftDetailsContainer: {
		display: "flex",
		paddingTop: "2vw",
	},
});

const SolNftDetails = () => {
	const [nftJson, setNftJson] = useState(null);
	const { mintAddress } = useParams();
	const [dataIsLoading, setDataIsLoading] = useState(true);

	useEffect(() => {
		if (nftJson) {
			setDataIsLoading(false);
		}
	}, [nftJson]);

	useEffect(async () => {
		let tokenmeta = await fetchSolNftMetadata(mintAddress);
		let tokenData = await getSolNftDetailsFromUri(tokenmeta);

		let json = {
			blockchain: "Solana",
			name: tokenData.data.name,
			imageSrc: tokenData.image,
			backgroundColor: tokenData.background_color,
			description: tokenData.description,
			owner: null,
			collection: tokenData.collection,
			slug: tokenData.data.symbol,
			tokenStandard: tokenData.tokenStandard,
			properties: tokenData.attributes,
			price: null,
			priceUsd: null,
			mint: tokenData.mint,
			updateAuthority: tokenData.updateAuthority,
			creators: tokenData.data.creators,
		};

		setNftJson(json);
	}, [mintAddress]);

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

export default SolNftDetails;
