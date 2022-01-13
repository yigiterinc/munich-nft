import React, { useState } from "react";
import Gallery from "./Gallery";
import AddAssets from "../components/edit-gallery/AddAssets";
import { isUserLoggedIn, getLoggedInUser } from "../utils/auth-utils";
import { useHistory } from "react-router-dom";
import {
	convertSelectedNftsToGalleryAssets,
	updateGallery,
} from "../api/strapi";

const GalleryContainer = () => {
	const [showAddAssetsView, setShowAddAssetsView] = useState(false);
	const [galleryData, setGalleryData] = useState();
	const history = useHistory();
	const user = getLoggedInUser();

	const handleSubmit = async (selectedItems) => {
		console.log(selectedItems);
		if (!isUserLoggedIn()) {
			history.push("/");
			return;
		}

		if (!user || !selectedItems) {
			return;
		}

		let galleryAssets = [];
		selectedItems.forEach((pair) => {
			const galleryAsset = {
				...pair.item,
			};

			galleryAsset.collection = {
				name: pair.collection.name,
				slug: pair.collection.slug,
			};

			galleryAssets.push(galleryAsset);
		});

		const updatedAssets = galleryData.nfts.concat(galleryAssets);

		const updateResult = await updateGallery(galleryData.galleryId, {
			assets: updatedAssets,
		});
		console.log(updateResult);
	};

	const getActiveComponent = () => {
		if (showAddAssetsView) {
			return (
				<AddAssets
					handleSubmit={handleSubmit}
					setShowAddAssetsView={setShowAddAssetsView}
				/>
			);
		} else {
			return (
				<Gallery
					setGalleryData={setGalleryData}
					setShowAddAssetsView={setShowAddAssetsView}
				/>
			);
		}
	};

	return getActiveComponent();
};

export default GalleryContainer;
