import { ABI } from "../res/contract";
import { MunichNftContractAddress } from "../config/config";
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

/*
	Will fail if the contract does not implement totalSupply or ownerOf
	these functions should be implemented when the contract implements
	ERC721Enumerable interface.

	@Returns the uris of tokens that this user owns on the contract at contractAddress
	These uris can be used to fetch the metadata of token
 */
export const findOwnedTokensOnERC721Contract = async (contractAddress, walletAddress) => {
	if (!walletAddress) {
		console.log("wallet addr undefined" , walletAddress);
		return;
	}

	if (!contractAddress) {
		console.log("contr addr undefined" , contractAddress);
		return;
	}

	const contract = new window.web3.eth.Contract(ABI, "0xE0622Ca84fe2aCD5a997579A1573c83F38a330C6", {
		from: walletAddress, // default from address
		gasPrice: "20000000", // default gas price in wei, 20 gwei in this case
	});

	const numberOfTokens = await contract.methods.totalSupply().call()
	const tokensOfUser = []
	for (let i = 0; i < numberOfTokens; i++ ) {
		const owner = await contract.methods.ownerOf(i).call();
		const ownedByUser = owner === walletAddress
		if (ownedByUser) {
			const tokenURI = await contract.methods.tokenURI(i).call();
			tokensOfUser.push(tokenURI);
		}
	}

	console.log(tokensOfUser);
	return tokensOfUser;
}

/* !!! not tested, potential issues
	Currently assumes that the contract implements the ERC1155Supply interface
*/
export const findOwnedTokensOnERC1155Contract = async (contractAddress, walletAddress) => {

	if (!walletAddress) {
		console.log("wallet addr undefined" , walletAddress);
		return;
	}

	if (!contractAddress) {
		console.log("contr addr undefined" , contractAddress);
		return;
	}

	const contract = new window.web3.eth.Contract(ABI, contractAddress, {
		from: walletAddress, // default from address
		gasPrice: "20000000", // default gas price in wei, 20 gwei in this case
	});

	const numberOfTokens = await contract.methods.totalSupply().call()
	const tokensOfUser = []
	for (let i = 0; i < numberOfTokens; i++ ) {
		const owner = await contract.methods.balanceOf(i).call();
		const ownedByUser = owner === address
		if (ownedByUser) {
			const tokenURI = await contract.methods.tokenURI(i).call();
			tokensOfUser.push(tokenURI);
		}
	}

	console.log(tokensOfUser);
}


export const mintNft = async (uploadedMetadata, gas, contractAddress = MunichNftContractAddress, ownerWalletAddress) => {
	if (!window.web3) {
		console.error("window.web3 not present");
		return;
	}

	const contract = new window.web3.eth.Contract(ABI, "0xE0622Ca84fe2aCD5a997579A1573c83F38a330C6", {
		from: "0xdB6340c38C7562b5Ed82258289fb4c36025D431E", // default from address
		gasPrice: "20000000", // default gas price in wei, 20 gwei in this case
	});
	// 2 to 5 thousand for rinkeby
	const txResult = await contract.methods
		.mint("0xdB6340c38C7562b5Ed82258289fb4c36025D431E", `https://ipfs.io/ipfs/${uploadedMetadata}`)
		.send({
			from: ownerWalletAddress,
			gas,
			gasPrice: "20000000",
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
	const contractAddress = MunichNftContractAddress;

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

