import React, { useState } from "react";
import Gallery from "./Gallery";
import AddAssets from "../components/edit-gallery/AddAssets";

const GalleryContainer = () => {
	const [showAddAssetsView, setShowAddAssetsView] = useState(false);

	const getActiveComponent = () => {
		if (showAddAssetsView) {
			return <AddAssets setShowAddAssetsView={setShowAddAssetsView} />;
		} else {
			return <Gallery setShowAddAssetsView={setShowAddAssetsView} />;
		}
	};

	return getActiveComponent();
};

export default GalleryContainer;
