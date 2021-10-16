import { React, useState, useEffect } from "react";

import "../config/config";

import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import Web3 from "web3";

import AddMetadata from "../components/mint-nft/AddMetadata";
import ListNft from "../components/mint-nft/ListNft";
import Mint from "../components/mint-nft/Mint";
import UploadArt from "../components/mint-nft/UploadArt";
import RenderMintNft from "../components/mint-nft/RenderMintNft";

let web3;

if (Web3.givenProvider) {
	web3 = new Web3(Web3.givenProvider || "ws://some.local-or-remote.node:8546");
}

function MintNft() {
	const [addedFileHash, setAddedFileHash] = useState("");
	const [uploadedMetadata, setUploadedMetadata] = useState("");
	const [mintedNft, setMintedNft] = useState("");
	const [listedNft, setListedNft] = useState("");
	const [nftName, setNftName] = useState("");
	const [nftDescription, setNftDescription] = useState("");
	const [resultingTokenId, setResultingTokenId] = useState("");
	const [listingPrice, setListingPrice] = useState(0);

	useEffect(() => {
		console.log("hash:", addedFileHash);
	}, [addedFileHash]);

	const handleReset = () => {};

	const onFileAdded = (path) => {
		setAddedFileHash(path);
	};

	return (
		<RenderMintNft
			addedFileHash={addedFileHash}
			setAddedFileHash={setAddedFileHash}
			handleReset={handleReset}
			onFileAdded={onFileAdded}
		></RenderMintNft>
	);
}

export default MintNft;
