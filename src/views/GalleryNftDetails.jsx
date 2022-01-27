import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { fetchSingleAsset } from "../api/opensea";
import { fetchGallery } from "../api/strapi";
import { getCurrentCryptoPriceInCurrency } from "../api/currencyHelper";
import { formatOpenseaPrice } from "../utils/currency-utils";

import withSpinner from "../components/common/WithSpinner";
import RenderNftDetails from "../components/nft-details/RenderNftDetails";

const GalleryNftDetails = () => {
	const [nftJson, setNftJson] = useState(null);
	const [galleryTheme, setGalleryTheme] = useState(null);
	const { slug, contractAddressId, tokenId } = useParams();
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
			console.log(slug);
			let gallery = await fetchGallery(slug);
			let theme = gallery.theme;
			setGalleryTheme(createTheme(theme));
		};
		fetchData();
	}, [contractAddressId, tokenId]);

	return (
		<>
			{withSpinner(renderPage(nftJson, galleryTheme), dataIsLoading, {
				position: "absolute",
				left: "50%",
				top: "50%",
			})}
		</>
	);
};

const renderPage = (nftJson, galleryTheme) => {
	return (
		<>
			{galleryTheme && (
				<>
					{console.log(galleryTheme)}
					<ThemeProvider theme={galleryTheme}>
						<RenderNftDetails nftJson={nftJson} />
					</ThemeProvider>
				</>
			)}
		</>
	);
};

export default GalleryNftDetails;
