import React, { useEffect, useState } from "react";
import { findOwnedTokensOnERC1155Contract, findOwnedTokensOnERC721Contract } from "../../api/chainHelper";
import { getLoggedInUser } from "../../utils/auth-utils";
import axios from "axios";
import ImportFromOpensea from "../profile/ImportFromOpensea";

const SelectFromContract = (props) => {
	const [nfts, setNfts] = useState(null);
	const [selectedNfts, setSelectedNfts] = useState();

	useEffect(async () => {
		const user = getLoggedInUser();
		const ipfsMetadataUris = await findOwnedTokensOnERC721Contract(props.contractAddress, user.walletAddress);
		const nftDetailPromises = [];
		let nftDetails = [];
		ipfsMetadataUris.forEach((uri) => {
			nftDetailPromises.push(axios.get(uri).then((response) => {
				nftDetails.push(response.data);
			}));
		});

		await Promise.all(nftDetailPromises);
		setNfts(nftDetails);
		console.log(nftDetails);
	}, []);


	return (
		<div>
			<ImportFromOpensea collections={nfts}
												 prevButton={props.prevButton}
												 handleSubmit={props.handleSubmit}
												 fromContract
			/>
		</div>
	);
};

export default SelectFromContract;