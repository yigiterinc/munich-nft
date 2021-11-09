import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { fetchSingleAsset } from "../api/opensea";
import { convertWeiToEth } from "../api/crypto";

import NftImage from "../components/nft-details/NftImage";
import NftDetailsPanel from "../components/nft-details/NftDetailsPanel";

const useStyles = makeStyles({
	nftDetailsContainer: {
		display: "flex",
		paddingTop: "2vw",
		justifyContent: "center",
	},
	spinner: {
		position: "absolute",
		left: "50%",
		top: "50%",
	},
});

const NftDetails = () => {
	const classes = useStyles();
	const [nftJson, setNftJson] = useState(null);
	const { contractAddressId, tokenId } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const tokenData = await fetchSingleAsset(contractAddressId, tokenId);
			let json = {
				name: tokenData.name,
				imageSrc: tokenData.image_url,
				backgroundColor: tokenData.background_color,
				description: tokenData.description,
				owner: tokenData.owner.address,
				collection: tokenData.collection.name,
				tokenStandard: tokenData.asset_contract.schema_name,
				contractAddressId,
				tokenId,
				properties: tokenData.traits,
				collectionSize: tokenData.collection.stats.count,
				price: convertWeiToEth(tokenData.orders[0].current_price),
			};
			setNftJson(json);
		};
		fetchData();
	}, [contractAddressId, tokenId]);

	return (
		<>
			{nftJson ? (
				renderEntirePage(classes, nftJson)
			) : (
				<CircularProgress className={classes.spinner} />
			)}
		</>
	);
};

const renderEntirePage = (classes, nftJson) => {
	return (
		<div className={classes.nftDetailsContainer}>
			<Grid item={true} xs={1} />
			<NftImage {...nftJson} />
			<NftDetailsPanel {...nftJson} />
			{/* <MoreFromThisCollection {...nftJson} /> WILL BE DONE IN THE FUTURE WHEN WE HAVE A MARKET PAGE :) */}
		</div>
	);
};

export default NftDetails;
