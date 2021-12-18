import React, { useEffect, useState } from "react";
import ImportFromOpensea from "../profile/ImportFromOpensea";
import { fetchCollectionsOfUser, filterAssetsInCollectionByOwner, getAssetsAddedCollections } from "../../api/opensea";
import { makeStyles } from "@material-ui/core/styles";
import { getLoggedInUser, isUserLoggedIn } from "../../utils/auth-utils";

const useStyles = makeStyles((theme) => ({
	baseContainer: {},
}));

const SelectGalleryNfts = (props) => {
	const [collections, setCollections] = useState(null);
	const classes = useStyles();

	useEffect(async () => {
		if (isUserLoggedIn()) {
			let collectionsData = await fetchCollectionsOfUser(getLoggedInUser().walletAddress);
			let collectionsWithAssets = [];
			collectionsWithAssets.push(
				await getAssetsAddedCollections(collectionsData),
			);
			console.log(collectionsWithAssets);

			let filtered = await filterAssetsInCollectionByOwner(
				collectionsWithAssets,
			);
			console.log(filtered);
			setCollections(filtered);
		}
	}, []);

	return (
		<div className={classes.baseContainer}>
			<ImportFromOpensea collections={collections}
												 prevButton={props.prevButton}
												 handleSubmit={props.handleSubmit}
			/>
		</div>
	);
};

export default SelectGalleryNfts;