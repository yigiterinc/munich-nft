import { ABI } from "../res/contract";
import { getMunichNftContractAddress } from "../config/config";
import { Network, OpenSeaPort } from "opensea-js";

let seaport;

if (window.web3) {
	seaport = new OpenSeaPort(window.web3.currentProvider, {
		networkName: Network.Rinkeby, // TODO read from config
	});
}

export const mintNftAfterDeployingNewContract = async (
	uploadedMetadata,
	gas
) => {
	// TODO
};

export const mintNft = async (uploadedMetadata, gas, contractAddress = getMunichNftContractAddress(), ownerWalletAddress) => {
	if (!window.web3) {
		console.error("window.web3 not present");
		return;
	}

	const contract = new window.web3.eth.Contract(ABI, contractAddress, {
		from: ownerWalletAddress, // default from address
		gasPrice: "200000", // default gas price in wei, 20 gwei in this case
	});

	const txResult = await contract.methods
		.mint(ownerWalletAddress, `https://ipfs.io/ipfs/${uploadedMetadata}`)
		.send({
			from: ownerWalletAddress,
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
	listingPrice,
	ownerWalletAddress
) => {
	const contractAddress = getMunichNftContractAddress();

	const listing = await seaport.createSellOrder({
		asset: {
			tokenId: resultingTokenId,
			tokenAddress: contractAddress,
		},
		accountAddress: ownerWalletAddress,
		startAmount: listingPrice,
		expirationTime,
	});

	return listing;
};
