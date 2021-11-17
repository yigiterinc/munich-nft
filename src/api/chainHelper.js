import { ABI } from "../res/contract";
import { getMunichNftContractAddress } from "../config/config";
import { Network, OpenSeaPort } from "opensea-js";

let seaport;

if (window.web3) {
	seaport = new OpenSeaPort(window.web3.currentProvider, {
		networkName: Network.Rinkeby, // TODO read from config
	});
}

export const mintNftAfterDeployingNewContract = async (uploadedMetadata, gas) => {
	// TODO
}

export const mintNft = async (uploadedMetadata, gas, contractAddress) => {
	if (!window.web3) {
		console.error("window.web3 not present");
		return;
	}

	const accounts = await window.web3.eth.requestAccounts();
	const account = accounts[0];

	const contract = new window.web3.eth.Contract(ABI, contractAddress, {
		from: account, // default from address
		gasPrice: "200000", // default gas price in wei, 20 gwei in this case
	});
	console.log(contractAddress);

	const txResult = await contract.methods
		.mint(account, `https://ipfs.io/ipfs/${uploadedMetadata}`)
		.send({
			from: account,
			gas,
			gasPrice: "200000",
		});

	const lastTokenId = txResult.events.Transfer.returnValues.tokenId;

	return {
		blockhash: txResult.blockHash,
		id: lastTokenId,
	};
};

export const listNft = async (
	expirationTime,
	resultingTokenId,
	listingPrice
) => {
	const contractAddress = getMunichNftContractAddress();
	const accounts = await window.web3.eth.requestAccounts();
	const account = accounts[0];

	const listing = await seaport.createSellOrder({
		asset: {
			tokenId: resultingTokenId,
			tokenAddress: contractAddress,
		},
		accountAddress: account,
		startAmount: listingPrice,
		expirationTime,
	});

	return listing;
};
