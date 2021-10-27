import React from "react";
import { Typography, Container, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getContractAddress } from "../../config/config"; // TODO get me out of here
import { OpenSeaPort, Network } from "opensea-js";

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
	},
	title: {
		margin: 40,
	},
}));

let web3 = window.web3;
let seaport;
if (web3) {
	seaport = new OpenSeaPort(web3.currentProvider, {
		networkName: Network.Rinkeby, // TODO read from config
	});
}

function ListNft({
	resetButton,
	listedNft,
	setListedNft,
	listingPrice,
	setListingPrice,
	resultingTokenId,
}) {
	const classes = useStyles();

	const listNft = async () => {
		const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24 * 365);
		const contractAddress = getContractAddress();
		const accounts = await window.web3.eth.requestAccounts();
		const account = accounts[0]; // ? is this correct

		const listing = await seaport.createSellOrder({
			asset: {
				tokenId: resultingTokenId,
				tokenAddress: contractAddress,
			},
			accountAddress: account,
			startAmount: listingPrice,
			expirationTime,
		});
		console.log(listing);
		setListedNft(listing.hash);
	};

	return (
		<div className={classes.root}>
			{listedNft ? (
				<Container style={{ textAlign: "center" }}>
					<Typography variant="body2">Listed: {listedNft}</Typography>
					{resetButton}
				</Container>
			) : (
				<Container>
					<Typography variant="h5">List your NFT</Typography>
					<TextField
						variant="outlined"
						placeholder="Price"
						value={listingPrice}
						onChange={(event) => setListingPrice(event.target.value)}
					/>
					<Button
						color="primary"
						size="large"
						variant="outlined"
						onClick={() => listNft()}
					>
						List!
					</Button>
				</Container>
			)}
		</div>
	);
}

export default ListNft;
