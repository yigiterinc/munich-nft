import React from "react";
import { Container, Button, Typography } from "@material-ui/core";

import Web3 from "web3"; // TODO get me out of here

import { CONTRACT_ADDRESS } from "../../config/config"; // TODO get me out of here
import { ABI } from "../../Res/contract"; // TODO get me out of here

let web3;

if (Web3.givenProvider) {
	// TODO get me out of here
	web3 = new Web3(Web3.givenProvider || "ws://some.local-or-remote.node:8546");
}

function Mint({
	nextButton,
	prevButton,
	mintedNft,
	setMintedNft,
	uploadedMetadata,
	setResultingTokenId,
}) {
	const mintNft = async () => {
		// TODO get me out of here
		const accounts = await web3.eth.requestAccounts();
		const account = accounts[0];
		const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
			from: account, // default from address
			gasPrice: "10000000000", // default gas price in wei, 20 gwei in this case
		});
		const contractCallRes = await contract.methods
			.mint(account, `https://ipfs.io/ipfs/${uploadedMetadata}`)
			.send();
		console.log(contractCallRes);
		setMintedNft(contractCallRes.blockHash);
		setResultingTokenId(contractCallRes.events.Transfer.returnValues.tokenId);
	};

	return (
		<>
			{mintedNft ? (
				<Container style={{ textAlign: "center" }}>
					<Typography variant="body2">Minted: {mintedNft}</Typography>
					{prevButton}
					{nextButton}
				</Container>
			) : (
				<Container>
					<Typography variant="h5">Mint your NFT</Typography>
					<Button
						color="primary"
						size="large"
						variant="outlined"
						onClick={() => mintNft()}
					>
						Mint!
					</Button>
				</Container>
			)}
			{prevButton}
			{nextButton}
		</>
	);
}

export default Mint;
