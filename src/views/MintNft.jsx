import { React, useState, useEffect } from "react";

import "../config/config";

import RenderMintNft from "../components/mint-nft/RenderMintNft";

function MintNft() {
	const [addedFileHash, setAddedFileHash] = useState("");
	const [uploadedMetadata, setUploadedMetadata] = useState("");
	const [mintedNft, setMintedNft] = useState(""); // Address of minted NFT
	const [listedNft, setListedNft] = useState("");
	const [nftName, setNftName] = useState("");
	const [nftDescription, setNftDescription] = useState("");
	const [resultingTokenId, setResultingTokenId] = useState("");
	const [listingPrice, setListingPrice] = useState(0);

	useEffect(() => {
		console.log("hash:", addedFileHash);
	}, [addedFileHash]);

	const onFileAdded = (path) => {
		setAddedFileHash(path);
	};

	const resetState = () => {
		setAddedFileHash("");
		setUploadedMetadata("");
		setMintedNft("");
		setListedNft("");
		setNftName("");
		setNftDescription("");
		setResultingTokenId("");
		setListingPrice("");
	};

	return (
		<RenderMintNft
			addedFileHash={addedFileHash}
			setAddedFileHash={setAddedFileHash}
			onFileAdded={onFileAdded}
			resetState={resetState}
			uploadedMetadata={uploadedMetadata}
			setUploadedMetadata={setUploadedMetadata}
			nftName={nftName}
			nftDescription={nftDescription}
			setNftName={setNftName}
			setNftDescription={setNftDescription}
			mintedNft={mintedNft}
			setMintedNft={setMintedNft}
			resultingTokenId={resultingTokenId}
			setResultingTokenId={setResultingTokenId}
			listedNft={listedNft}
			setListedNft={setListedNft}
			listingPrice={listingPrice}
			setListingPrice={setListingPrice}
		></RenderMintNft>
	);
}

export default MintNft;
