import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleAsset } from "../api/opensea";
import { getCurrentCryptoPriceInCurrency } from "../api/currencyHelper";
import { formatOpenseaPrice } from "../utils/currency-utils";
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
			const ethPrice = await getCurrentCryptoPriceInCurrency("ETH", "USD");
			let listedPrice = 1; // dummy now --> feat: read price from contract instead of opensea api --> it does not return price properly
			let creator = null;
			if (tokenData.orders && tokenData.orders.length !== 0) {
				listedPrice = formatOpenseaPrice(tokenData.orders[0].current_price);
			}
			if (tokenData.creator.user.username !== null) {
				creator = tokenData.creator.user.username;
			}

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
				price: listedPrice,
				priceUsd: listedPrice * ethPrice,
				createdBy: creator,
				stats: [
					{ items: tokenData.collection.stats.total_supply },
					{ owners: tokenData.collection.stats.num_owners },
					{ floor: tokenData.collection.stats.floor_price },
					{ volume: tokenData.collection.stats.total_volume },
				],
			};
			console.log(json);
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
