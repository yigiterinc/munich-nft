import React from "react";

import NftHeader from "./NftHeader";
import CollectionGroup from "./CollectionGroup";
import DetailsSection from "./DetailsSection";

const Details = (props) => {
	return (
		<>
			<NftHeader nftJson={props.nftJson} />
			{props.nftJson.blockchain === "Ethereum" && (
				<>
					<CollectionGroup nftJson={props.nftJson} />
					<DetailsSection {...props.nftJson} />
				</>
			)}
		</>
	);
};

export default Details;
