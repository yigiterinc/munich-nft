import React from "react";
import { Container, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getContractAddress } from "../../config/config"; // TODO get me out of here
import { ABI } from "../../res/contract"; // TODO get me out of here

let web3 = window.web3;

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
		const account = "0xdB6340c38C7562b5Ed82258289fb4c36025D431E";
		const contractAddress = getContractAddress();
		console.log(contractAddress);

		const contract = new web3.eth.Contract(ABI, contractAddress, {
			from: account, // default from address
			gasPrice: "200000", // default gas price in wei, 20 gwei in this case
		});

		const transaction = await contract.methods.mint(
			account,
			`https://ipfs.io/ipfs/${uploadedMetadata}`
		);

		let gas = 300000;
		let data = transaction.encodeABI();
		console.log(gas);

		const options = {
			from: account,
			to: contractAddress,
			gas,
			data,
		};

		const signed = await web3.eth.accounts.signTransaction(
			options,
			"0x9444d064d9f3da4d8f46b5b3dfa48a4ef4702ebae9687757d1e28dcadee62930" // TODO remove PK from here
		);
		const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
		console.log(receipt);

		setMintedNft(receipt.blockHash);

		let events = await contract.getPastEvents("allEvents", { fromBlock: 1 });
		const lastTokenId = events[events.length - 1].returnValues.tokenId;
		setResultingTokenId(lastTokenId);
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
