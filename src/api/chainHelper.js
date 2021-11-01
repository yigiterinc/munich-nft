import { ABI } from "../res/contract";
import { getContractAddress } from "../config/config";
import { OpenSeaPort, Network } from "opensea-js";

let seaport;

if (window.web3) {
	seaport = new OpenSeaPort(window.web3.currentProvider, {
		networkName: Network.Rinkeby, // TODO read from config
	});
}

export const mintNft = async (uploadedMetadata, gas) => {
	if (!window.web3) {
		console.error("window.web3 not present");
		return;
	}

	const account = "0xdB6340c38C7562b5Ed82258289fb4c36025D431E";
	const contractAddress = getContractAddress();

	const contract = new window.web3.eth.Contract(ABI, contractAddress, {
		from: account, // default from address
		gasPrice: "200000", // default gas price in wei, 20 gwei in this case
	});

	const transaction = await contract.methods.mint(
		account,
		`https://ipfs.io/ipfs/${uploadedMetadata}`
	);

	let data = transaction.encodeABI();

	const options = {
		from: account,
		to: contractAddress,
		gas,
		data,
	};

	const signed = await window.web3.eth.accounts.signTransaction(
		options,
		"0x9444d064d9f3da4d8f46b5b3dfa48a4ef4702ebae9687757d1e28dcadee62930"
	);
	const receipt = await window.web3.eth.sendSignedTransaction(
		signed.rawTransaction
	);
	console.log(receipt);

	let events = await contract.getPastEvents("allEvents", { fromBlock: 1 });
	const lastTokenId = events[events.length - 1].returnValues.tokenId;

	return {
		blockhash: receipt.blockHash,
		id: lastTokenId,
	};
};

export const listNft = async (
	expirationTime,
	resultingTokenId,
	listingPrice
) => {
	const contractAddress = getContractAddress();
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
