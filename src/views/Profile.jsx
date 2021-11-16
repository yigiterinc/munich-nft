import React, { useState, useEffect } from "react";
import AssetCard from "../components/profile/AssetCard";
import Header from "../components/profile/Header";
import Import from "../components/profile/Import";
import Modal from "../components/common/Modal";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
	fetchCollectionsOfUser,
	getAssetsAddedCollections,
} from "../api/opensea";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		paddingTop: "3vw",
		paddingLeft: "10vw",
		paddingRight: "10vw",
	},
	importButton: {
		display: "block",
		margin: "0 auto",
	},
}));

const Profile = ({ account, user }) => {
	const [openImportModal, setOpenImportModal] = useState(false);
	const [collections, setCollections] = useState(null);
	const [importedCollections, setImportedCollections] = useState(null);
	const [importedNfts, setImportedNfts] = useState(null);
	const classes = useStyles();

	const userSoldTheAsset = (asset, tx) => {
		if (!asset.last_sale.event_type === 'successful')	return false;
		console.log('asset: ', asset,' tx: ', tx);

		if (tx.from !== account && tx.logs[0]?.data.indexOf(account) >= 0) {
			return true;
		} else if (tx.from === account && tx.logs[0]?.data.indexOf(account) < 0) {
			return tx.logs.length > 2;
		} else if (tx.from === tx.logs[0]?.data.substring(0, 42)) {
			return true;
		}

		return false;
	}

	const assetBelongsToCurrentUser = async (asset) => {
		if (asset.owner.address === account) {
			return true;
		}

		if (!asset.last_sale) {
			return asset.creator.address === account;
		}

		window.web3.defaultChain = 'rinkeby'
		const txHash = asset.last_sale.transaction.transaction_hash
		const tx = await window.web3.eth.getTransactionReceipt(txHash)

		if (userSoldTheAsset(asset, tx)) {
			return false;
		}

		return tx.logs[0].topics.join().indexOf(account.substring(3)) >= 0;
	}

	const filterAssetsInCollectionByOwner = async (collectionWithAssets) => {
		let filteredCollections = collectionWithAssets[0]
		let currCollection;
		for (let i = 0; i < filteredCollections.length; i++) {
			let assetsOfUserInCurrCollection = []
			currCollection = filteredCollections[i];

			let asset;
			for (let i = 0; i < currCollection.assets.length; i++) {
				asset = currCollection.assets[i]

				if (await assetBelongsToCurrentUser(asset)) {
					assetsOfUserInCurrCollection.push(asset)
				}
			}

			filteredCollections[i].assets = assetsOfUserInCurrCollection
		}

		return filteredCollections;
	}

	useEffect(async () => {
		if (account) {
			let collectionsData = await fetchCollectionsOfUser(account);
			let collectionsWithAssets = [];

			collectionsWithAssets
				.push(await getAssetsAddedCollections(collectionsData))
			let filtered = await filterAssetsInCollectionByOwner(collectionsWithAssets)
			console.log(filtered);
			setCollections(filtered);
		}
	}, [account, openImportModal]);

	return (
		<>
			<Grid container spacing={4} className={classes.gridContainer}>
				<Grid item xs={12}>
					<Header
						profile={user}
						openImportModal={() => setOpenImportModal(true)}
					/>
				</Grid>
				{importedCollections &&
					importedCollections.map((collection) =>
						collection.assets.map((item) => {
							return (
								<Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
									<AssetCard asset={item} />
								</Grid>
							);
						})
					)}
				{importedNfts &&
					importedNfts.map((item) => {
						return (
							<Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
								<AssetCard asset={item} />
							</Grid>
						);
					})}
			</Grid>
			<Modal
				title="Import"
				openModal={openImportModal}
				setOpenModal={setOpenImportModal}
			>
				<Import
					collections={collections}
					onImportCollections={(collections) => {
						console.log('onImportCollections', collections);
						setImportedCollections(collections);
						setOpenImportModal(false);
					}}
					onImportNfts={(nfts) => {
						console.log(nfts);
						setImportedNfts(nfts);
						setOpenImportModal(false);
					}}
				/>
			</Modal>
		</>
	);
};

export default Profile;
