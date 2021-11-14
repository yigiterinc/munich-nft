import React, { useState, useEffect } from "react";
import AssetCard from "../components/profile/AssetCard";
import Header from "../components/profile/Header";
import Import from "../components/profile/Import";
import Modal from "../components/common/Modal";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import dummyProfile from "../dummy/dummyProfile.json";
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

const Profile = ({ account }) => {
	const [openImportModal, setOpenImportModal] = useState(false);
	const [collections, setCollections] = useState(null);
	const [importedCollections, setImportedCollections] = useState(null);
	const [importedNfts, setImportedNfts] = useState(null);
	const classes = useStyles();

	useEffect(async () => {
		if (account) {
			let collectionsData = await fetchCollectionsOfUser(account);
			setCollections(await getAssetsAddedCollections(collectionsData));
		}
	}, [account, openImportModal]);

	return (
		<>
			<Grid container spacing={4} className={classes.gridContainer}>
				<Grid item xs={12}>
					<Header
						profile={dummyProfile}
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
						console.log(collections);
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
