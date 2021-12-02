import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CollectionHeader from "../components/collection/CollectionHeader";
import CollectionMenu from "../components/collection/CollectionMenu";
import CollectionAssets from "../components/collection/CollectionAssets";
import { fetchAssetsInCollection, fetchSingleCollectionMetadata } from "../api/opensea";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		paddingTop: "3vw",
		paddingLeft: "10vw",
		paddingRight: "10vw",
	},
}));

const Collection = () => {
	const [collection, setCollection] = useState();
	const [assets, setAssets] = useState();
	const classes = useStyles();

	let { slug } = useParams();

	useEffect(async () => {
		const collectionData = await fetchSingleCollectionMetadata(slug);
		setCollection(collectionData?.collection);
	}, [slug]);

	useEffect(async () => {
		const assetsData = await fetchAssetsInCollection(slug);
		setAssets(assetsData?.data?.assets);
	}, [collection]);

	return (
		<Grid container spacing={4} className={classes.gridContainer}>
			<Grid item xs={12}>
				<CollectionHeader collection={collection} assets={assets} />
			</Grid>
			<Grid item xs={12}>
				<CollectionMenu />
			</Grid>
			<CollectionAssets assets={assets} />
		</Grid>
	);
};

export default Collection;
