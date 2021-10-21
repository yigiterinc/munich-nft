import React from "react";
import { Container, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Web3 from "web3"; // TODO get me out of here

import { CONTRACT_ADDRESS } from "../../config/config"; // TODO get me out of here
import { ABI } from "../../res/contract"; // TODO get me out of here

let web3;

if (Web3.givenProvider) {
	// TODO get me out of here
	web3 = new Web3(Web3.givenProvider || "ws://some.local-or-remote.node:8546");
}

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
	},
	title: {
		margin: 40,
	},
	mintButton: {
		margin: theme.spacing(1),
	},
}));

function Mint({
	nextButton,
	prevButton,
	mintedNft,
	setMintedNft,
	uploadedMetadata,
	setResultingTokenId,
}) {
	const classes = useStyles();

	const mintNft = async () => {
		// TODO get me out of here
		const accounts = await web3.eth.requestAccounts();
		console.log(accounts, accounts[0]);
		const account = accounts[0];

		const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
			from: account, // default from address
			gasPrice: "10000000000", // default gas price in wei, 20 gwei in this case
		});

		const transaction = await contract.methods.mint(
			account,
			`https://ipfs.io/ipfs/${uploadedMetadata}`
		);

		const options = {
			to: transaction._parent._address,
			data: transaction.encodeABI(),
			gas: await transaction.estimateGas({ from: account }),
			gasPrice: "10000000000",
		};

		const signed = await web3.eth.accounts.signTransaction(
			options,
			"0x9444d064d9f3da4d8f46b5b3dfa48a4ef4702ebae9687757d1e28dcadee62930"
		);
		const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
		console.log(receipt);

		const nftsMinted = await contract.methods.ownerOf(1).call();
		console.log(nftsMinted);
		setMintedNft(receipt.blockHash);
		//setResultingTokenId(contractCallRes.events.Transfer.returnValues.tokenId);
	};

	return (
		<div className={classes.root}>
			{mintedNft ? (
				<Container>
					<Typography className={classes.title} variant="body2">
						Minted: {mintedNft}
					</Typography>
					{prevButton}
					{nextButton}
				</Container>
			) : (
				<Container>
					<Typography className={classes.title} variant="h5">
						Mint your NFT
					</Typography>
					<Button
						className={classes.mintButton}
						color="primary"
						size="large"
						variant="outlined"
						onClick={() => mintNft()}
					>
						Mint!
					</Button>
				</Container>
			)}
		</div>
	);
}

export default Mint;
