import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NftDetails from "../components/nft-details/NftDetails";
import withSpinner from "../components/common/WithSpinner";
import { fetchSolNftMetadata, getSolNftDetailsFromUri } from "../api/sol";

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

	return (
		<>
			{withSpinner(<NftDetails nftJson={nftJson} />, dataIsLoading, {
				position: "absolute",
				left: "50%",
				top: "50%",
			})}
		</>
	);
};

export default SolNftDetails;
