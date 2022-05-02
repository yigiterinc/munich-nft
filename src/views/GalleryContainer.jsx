import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import AddorRemoveAssetsContainer from "../components/edit-gallery/AddorRemoveAssetsContainer";
import { isUserLoggedIn, getLoggedInUser } from "../utils/auth-utils";
import { useHistory } from "react-router-dom";
import { fetchGallery, updateGallery } from "../api/strapi";
import { useParams } from "react-router-dom";

const GalleryContainer = () => {
	const { slug } = useParams();

	const [showAddAssetsView, setShowAddAssetsView] = useState(false);
	const [showRemoveAssetsView, setShowRemoveAssetsView] = useState(false);
	const [galleryData, setGalleryData] = useState(null);

	const [updatePerformed, setUpdatePerformed] = useState(false);

	const history = useHistory();

	const user = getLoggedInUser();

	useEffect( () => {
		const loadGalleryData = async () => {
			setGalleryData(await fetchGallery(slug))
		}

		if (!galleryData || updatePerformed) {
			loadGalleryData()
			setUpdatePerformed(false)
		}
	}, [galleryData, updatePerformed]);

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

		console.log(galleryData);

		const updateResult = await updateGallery(galleryData.id, {
			assets: updatedAssets,
		});

		if (updateResult.status === 200) {
			setShowAddAssetsView(false);
			setUpdatePerformed(true)
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

			removedGalleryAssets.push(galleryAsset);
		});

		const removedAssetIds = removedGalleryAssets.map((item) => item.id);

		const updatedAssets = galleryData.assets.filter(
			(item) => !removedAssetIds.includes(item.id)
		);

		const updateResult = await updateGallery(galleryData.id, {
			assets: updatedAssets,
		});

		if (updateResult.status === 200) {
			setShowRemoveAssetsView(false);
			setUpdatePerformed(true)
		}
	};

	const getActiveComponent = () => {
		if (showAddAssetsView || showRemoveAssetsView) {
			return (
				<AddorRemoveAssetsContainer
					add={showAddAssetsView}
					galleryAssets={galleryData.assets}
					handleAddGalleryAssets={handleAddSelectedAssets}
					setShowAddAssetsView={setShowAddAssetsView}
					setShowRemoveAssetsView={setShowRemoveAssetsView}
					handleRemoveGalleryAssets={handleRemoveSelectedAssets}
				/>
			);
		} else {
			return (
				<Gallery
					gallery={galleryData}
					slug={slug}
					isOwner={user && (user.id === galleryData?.userId)}
					setShowAddAssetsView={setShowAddAssetsView}
					setShowRemoveAssetsView={setShowRemoveAssetsView}
				/>
			);
		}
	};

	return getActiveComponent();
};

export default GalleryContainer;
