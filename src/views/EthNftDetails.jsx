import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleAsset } from "../api/opensea";
import NftDetails from "../components/nft-details/NftDetails";
import withSpinner from "../components/common/WithSpinner";

const EthNftDetails = () => {
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

			let json = {
				blockchain: "Ethereum",
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
			};
			setNftJson(json);
		};
		fetchData();
	}, [contractAddressId, tokenId]);

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

export default EthNftDetails;
