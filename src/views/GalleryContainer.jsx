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

	const handleImportAssetsOrCollection = async (selectedItems) => {
		if (!selectedItems)	return;

		let selectedItemsAreEthNft = selectedItems[0].hasOwnProperty("item"); // and not collection
		if (selectedItemsAreEthNft) {
			return await handleAddSelectedAssets(selectedItems)
		}

		/* At this point we know that selectedItems is a collection
			 Only one collection can be selected at a time, so we can take 0th index
		*/
		selectedItems = selectedItems[0]
		let updatedAssets;
		if (selectedItems.assets) {
		 updatedAssets = selectedItems.assets.concat(galleryData.assets);
		} else {
			console.log("assets field not found in selected items");
		}

		console.log(updatedAssets, selectedItems);

		return await postGalleryAssetsUpdate(updatedAssets);
	}

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
			console.log(pair);
			const galleryAsset = {
				...pair.item,
			};

			galleryAsset.collection = {
				name: pair.collection.name,
				slug: pair.collection.slug,
			};

			const collection = pair.collection;
			addedGalleryAssets.push({ item: galleryAsset, collection });
		});

		const updatedAssets = galleryData.assets.concat(addedGalleryAssets);

		console.log(galleryData);

		return await postGalleryAssetsUpdate(updatedAssets)
	};

	const postGalleryAssetsUpdate = async (updatedAssets) => {
		const updateResult = await updateGallery(galleryData.id, {
			assets: updatedAssets,
		});

		if (updateResult.status === 200) {
			setShowAddAssetsView(false);
			setShowRemoveAssetsView(false);
			setUpdatePerformed(true)
		}
	}

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
			const isImportedAsAsset = Object.keys(pair).includes('item');

			if (isImportedAsAsset) {
				const galleryAsset = {
					...pair.item,
				};

				removedGalleryAssets.push(galleryAsset);
			} else {
				removedGalleryAssets.push(pair.asset)
			}
		});

		const removedAssetIds = removedGalleryAssets.map((item) => item.id);

		const updatedAssets = galleryData.assets.filter(
			(item) => !removedAssetIds.includes(item.id)
		);

		console.log(updatedAssets);

		return await postGalleryAssetsUpdate(updatedAssets)
	};

	const getActiveComponent = () => {
		if (showAddAssetsView || showRemoveAssetsView) {
			return (
				<AddorRemoveAssetsContainer
					add={showAddAssetsView}
					galleryAssets={galleryData.assets}
					handleAddGalleryAssets={handleImportAssetsOrCollection}
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
