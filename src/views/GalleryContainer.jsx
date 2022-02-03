import React, { useState } from "react";
import Gallery from "./Gallery";
import AddorRemoveAssetsContainer from "../components/edit-gallery/AddorRemoveAssetsContainer";
import { isUserLoggedIn, getLoggedInUser } from "../utils/auth-utils";
import { useHistory } from "react-router-dom";
import { updateGallery } from "../api/strapi";
import RemoveAssets from "../components/edit-gallery/RemoveAssets";

const GalleryContainer = () => {
	const [showAddAssetsView, setShowAddAssetsView] = useState(false);
	const [showRemoveAssetsView, setShowRemoveAssetsView] = useState(false);
	const [galleryData, setGalleryData] = useState();
	const history = useHistory();
	const user = getLoggedInUser();

	const handleAddSelectedAssets = async (selectedItems) => {
		if (!isUserLoggedIn()) {
			history.push("/");
			return;
		}

		if (!user || !selectedItems) {
			return;
		}

		let addedGalleryAssets = [];
		selectedItems.forEach((pair) => {
			const galleryAsset = {
				...pair.item,
			};

			galleryAsset.collection = {
				name: pair.collection.name,
				slug: pair.collection.slug,
			};

			addedGalleryAssets.push(galleryAsset);
		});

		const updatedAssets = galleryData.assets.concat(addedGalleryAssets);

		const updateResult = await updateGallery(galleryData.galleryId, {
			assets: updatedAssets,
		});

		if (updateResult.status === 200) {
			setShowAddAssetsView(false);
		}
	};

	const handleRemoveSelectedAssets = async (selectedItems) => {
		console.log(selectedItems);
		if (!isUserLoggedIn()) {
			history.push("/");
			return;
		}

		if (!user || !selectedItems) {
			return;
		}

		let removedGalleryAssets = [];
		selectedItems.forEach((pair) => {
			const galleryAsset = {
				...pair.item,
			};

			galleryAsset.collection = {
				name: pair.collection.name,
				slug: pair.collection.slug,
			};

			removedGalleryAssets.push(galleryAsset);
		});

		const removedAssetIds = removedGalleryAssets.map((item) => item.id);

		const updatedAssets = galleryData.assets.filter(
			(item) => !removedAssetIds.includes(item.id)
		);

		const updateResult = await updateGallery(galleryData.galleryId, {
			assets: updatedAssets,
		});

		if (updateResult.status === 200) {
			setShowRemoveAssetsView(false);
		}
	};

	const getActiveComponent = () => {
		if (showAddAssetsView) {
			return (
				<AddorRemoveAssetsContainer
					add={true}
					galleryAssets={galleryData.assets}
					handleChangeGalleryAssets={handleAddSelectedAssets}
					setShowSelectedView={setShowAddAssetsView}
				/>
			);
		} else if (showRemoveAssetsView) {
			return (
				<RemoveAssets
					galleryAssets={galleryData.assets}
					handleChangeGalleryAssets={handleRemoveSelectedAssets}
					setShowSelectedView={setShowRemoveAssetsView}
				/>
			);
		} else {
			return (
				<Gallery
					setGalleryData={setGalleryData}
					setShowAddAssetsView={setShowAddAssetsView}
					setShowRemoveAssetsView={setShowRemoveAssetsView}
				/>
			);
		}
	};

	return getActiveComponent();
};

export default GalleryContainer;
