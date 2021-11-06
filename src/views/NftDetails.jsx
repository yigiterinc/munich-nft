import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { fetchSingleAsset } from "../api/opensea";
import NftImagePanel from "../components/Home/nft-details/NftImagePanel";
import NftDetailsPanel from "../components/Home/nft-details/NftDetailsPanel";

const useStyles = makeStyles({
	gridContainer: {
		paddingTop: "3vw",
		paddingLeft: "12vw",
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
				<Grid container className={classes.gridContainer}>
					<NftImagePanel {...nftJson} />
					<NftDetailsPanel nft={nftJson} />
				</Grid>
			) : (
				<CircularProgress className={classes.spinner} />
			)}
		</>
	);
};

export default NftDetails;
