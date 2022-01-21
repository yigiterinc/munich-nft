import React from "react";
import NftsDefaultLayout from "./gallery-nfts/NftsDefaultLayout";
import NftsLayout1 from "./gallery-nfts/NftsLayout1";

const GalleryNfts = (props) => {
	return <>{renderSelectedNftsLayout(props)}</>;
};

const renderSelectedNftsLayout = (props) => {
	if (props.nftsLayout === "default") {
		return <NftsDefaultLayout {...props} />;
	} else if (props.nftsLayout === "layout-1") {
		return <NftsLayout1 {...props} />;
	}
};

export default GalleryNfts;
