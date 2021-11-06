import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { fetchSingleAsset } from "../api/opensea";
import NftImage from "../components/nft-details/NftImage";
import NftDetailsPanel from "../components/nft-details/NftDetailsPanel";

const useStyles = makeStyles({
	nftDetailsContainer: {
		display: "flex",
		paddingTop: "2vw",
		justifyContent: "center",
	},
	moreFromThisCollectionContainer: {},
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

	useEffect(async () => {
		const tokenData = await fetchSingleAsset(contractAddressId, tokenId);
		let customJson = {
			name: tokenData.name,
			imageSrc: tokenData.image_url,
			backgroundColor: tokenData.background_color,
			description: tokenData.description,
			owner: tokenData.owner.address,
			collection: tokenData.collection.slug,
			contractAddressId: contractAddressId,
			tokenId: tokenId,
		};
		setNftJson(customJson);
	}, []);

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
		<>
			<div className={classes.nftDetailsContainer}>
				<NftImage {...nftJson} />
				<NftDetailsPanel {...nftJson} />
			</div>
			<div className={classes.moreFromThisCollectionContainer}></div>
		</>
	);
};

export default NftDetails;
