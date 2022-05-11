import React from "react";

import NftHeader from "./NftHeader";
import CollectionGroup from "./CollectionGroup";
import DetailsSection from "./DetailsSection";
import PriceField from "./PriceField";

const Details = (props) => {
	return (
		<>
			<NftHeader nftJson={props.nftJson} />
			{props.nftJson.blockchain === "Ethereum" && (
				<>
					<CollectionGroup nftJson={props.nftJson} />
					<DetailsSection {...props.nftJson} />
					<PriceField nftJson={props.nftJson} />
					{/* <DescriptionSection {...props.nftJson} /> */}
				</>
			)}
		</>
	);
};

export default Details;
