import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { fetchSingleAsset } from "../api/opensea";
import NftImage from "../components/Home/nft-details/NftImage";

const useStyles = makeStyles((theme) => ({
	nftDetailsContainer: {
		width: "100vw",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
	},
	gridContainer: {
		paddingTop: "3vw",
		paddingLeft: "10vw",
		paddingRight: "10vw",
		backgroundColor: "brown",
	},
	nftContainer: {
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
		whiteSpace: "nowrap",
		marginBottom: theme.spacing(1),
		backgroundColor: "white",
	},
	spinner: {
		position: "absolute",
		left: "50%",
		top: "50%",
	},
}));

const NftDetails = () => {
	const classes = useStyles();
	const [nft, setNft] = useState(null);
	const { contractAddressId, tokenId } = useParams();

	useEffect(async () => {
		const tokenData = await fetchSingleAsset(contractAddressId, tokenId);
		setNft(tokenData);
	}, []);

	return (
		<div className={classes.nftDetailsContainer}>
			{nft ? (
				<Grid container spacing={4} className={classes.gridContainer}>
					<Grid item xs={8}>
						<NftImage url={nft.image_original_url} />
					</Grid>
					<Grid item xs={4}>
						<Box className={classes.nftContainer}>xs=4</Box>
					</Grid>
				</Grid>
			) : (
				<CircularProgress className={classes.spinner} />
			)}
		</div>
	);
};

export default NftDetails;
