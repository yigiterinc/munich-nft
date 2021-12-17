import React, { useEffect, useState } from "react";
import Import from "../profile/Import";
import {
	fetchCollectionsOfUser,
	getAssetsAddedCollections,
} from "../../api/opensea";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	baseContainer: {},
}));

const SelectGalleryNfts = (props) => {
	const [collections, setCollections] = useState(null);

	const classes = useStyles();

	useEffect(async () => {
		if (props.account) {
			let collectionsData = await fetchCollectionsOfUser(props.account);
			let collectionsWithAssets = [];
			collectionsWithAssets.push(
				await getAssetsAddedCollections(collectionsData)
			);

			let filtered = await filterAssetsInCollectionByOwner(
				collectionsWithAssets
			);
			console.log(filtered);
			setCollections(filtered);
		}
	}, [props.account]);

	const userSoldTheAsset = (asset, tx) => {
		if (!asset.last_sale.event_type === "successful") return false;

		if (
			tx.from !== props.account &&
			tx.logs[0]?.data.indexOf(props.account) >= 0
		) {
			return true;
		} else if (
			tx.from === props.account &&
			tx.logs[0]?.data.indexOf(props.account) < 0
		) {
			return tx.logs.length > 2;
		} else if (tx.from === tx.logs[0]?.data.substring(0, 42)) {
			return true;
		}

		return false;
	};

	const assetBelongsToCurrentUser = async (asset) => {
		if (asset.owner.address === props.account) {
			return true;
		}

		if (!asset.last_sale) {
			return asset.creator.address === props.account;
		}

		window.web3.defaultChain = "rinkeby";
		const txHash = asset.last_sale.transaction.transaction_hash;
		console.log(txHash);
		const tx = await window.web3.eth.getTransactionReceipt(txHash);

		if (!tx || userSoldTheAsset(asset, tx)) {
			return false;
		}

		return tx.logs[0].topics.join().indexOf(props.account.substring(3)) >= 0;
	};

	const filterAssetsInCollectionByOwner = async (collectionWithAssets) => {
		let filteredCollections = collectionWithAssets[0];
		let currCollection;
		for (let i = 0; i < filteredCollections.length; i++) {
			let assetsOfUserInCurrCollection = [];
			currCollection = filteredCollections[i];

			let asset;
			for (let i = 0; i < currCollection.assets.length; i++) {
				asset = currCollection.assets[i];

				if (await assetBelongsToCurrentUser(asset)) {
					assetsOfUserInCurrCollection.push(asset);
				}
			}

			filteredCollections[i].assets = assetsOfUserInCurrCollection;
		}

		return filteredCollections;
	};

	return (
		<div className={classes.baseContainer}>
			<Import
				collections={collections}
				prevButton={props.prevButton}
				handleSubmit={props.handleSubmit}
			/>
		</div>
	);
};

export default SelectGalleryNfts;
