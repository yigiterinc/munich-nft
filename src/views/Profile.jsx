import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import Import from "../components/profile/Import";
import Modal from "../components/common/Modal";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
	fetchCollectionsOfUser,
	getAssetsAddedCollections,
} from "../api/opensea";
import { saveImportedCollections, saveImportedNfts } from "../api/strapi";
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		paddingTop: "4vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	galleriesContainer: {
		width: "85vw",
		boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(63, 174, 223) 0px 0px 0px 5px",
		paddingTop: "2vw",
		paddingLeft: "5vw",
		paddingRight: "5vw",
		borderRadius: "2px",
		minHeight: "30vh",
		marginBottom: "5vh",
	},
	importButton: {
		display: "block",
		margin: "0 auto",
	},
	noGalleryFoundContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "85vw",
		minHeight: "30vh",
		paddingBottom: "1vh",
		paddingTop: "2vh",
		boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(63, 174, 223) 0px 0px 0px 5px",
	},
	noGalleryFoundDescription: {
		fontSize: "20px",
		letterSpacing: "1px",
		width: "60vw",
		marginBottom: "4vh",
	},
	createGalleryButton: {
		paddingTop: "2vh",
		paddingBottom: "2vh",
	},
}));

const Profile = ({ account, user }) => {
	const [openImportModal, setOpenImportModal] = useState(false);
	const [collections, setCollections] = useState(null);
	const [importedCollections, setImportedCollections] = useState(null);
	const [importedNfts, setImportedNfts] = useState(null);
	const classes = useStyles();

	const userSoldTheAsset = (asset, tx) => {
		if (!asset.last_sale.event_type === "successful") return false;

		if (tx.from !== account && tx.logs[0]?.data.indexOf(account) >= 0) {
			return true;
		} else if (tx.from === account && tx.logs[0]?.data.indexOf(account) < 0) {
			return tx.logs.length > 2;
		} else if (tx.from === tx.logs[0]?.data.substring(0, 42)) {
			return true;
		}

		return false;
	};

	const assetBelongsToCurrentUser = async (asset) => {
		if (asset.owner.address === account) {
			return true;
		}

		if (!asset.last_sale) {
			return asset.creator.address === account;
		}

		window.web3.defaultChain = "rinkeby";
		const txHash = asset.last_sale.transaction.transaction_hash;
		console.log(txHash);
		const tx = await window.web3.eth.getTransactionReceipt(txHash);

		if (!tx || userSoldTheAsset(asset, tx)) {
			return false;
		}

		return tx.logs[0].topics.join().indexOf(account.substring(3)) >= 0;
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

	useEffect(async () => {
		if (account) {
			let collectionsData = await fetchCollectionsOfUser(account);
			let collectionsWithAssets = [];

			collectionsWithAssets.push(
				await getAssetsAddedCollections(collectionsData),
			);
			let filtered = await filterAssetsInCollectionByOwner(
				collectionsWithAssets,
			);
			console.log(filtered);
			setCollections(filtered);
		}
	}, [account, openImportModal]);

	const galleries = () => {
		return (<Grid container spacing={4} className={classes.galleriesContainer}>
			<p>Hello</p>
		</Grid>);
	};

	const noGalleryFound = () => {
		return (
			<div className={classes.noGalleryFoundContainer}>
				<p className={classes.noGalleryFoundDescription}>
					Galleries are a great way to present your NFT portfolio to people!
					Create one by clicking the button below.
				</p>
				<Button component={Link} to="/create-gallery" variant={"outlined"} className={classes.createGalleryButton}>Create Gallery</Button>
			</div>
		);
	};

	return (
		<div className={classes.mainContainer}>
			<ProfileHeader
				profile={user}
				openImportModal={() => setOpenImportModal(true)}
			/>
			{user?.galleries ? galleries() : noGalleryFound()}
			<Modal
				title="Import"
				openModal={openImportModal}
				setOpenModal={setOpenImportModal}
			>
				<Import
					collections={collections}
					onImportCollections={async (collections) => {
						setImportedCollections(collections);
						await saveImportedCollections(user, collections);
						setOpenImportModal(false);
					}}
					onImportNfts={(nfts) => {
						setImportedNfts(nfts);
						setOpenImportModal(false);
						saveImportedNfts(user, nfts);
					}}
				/>
			</Modal>
		</div>
	);
};

export default Profile;
