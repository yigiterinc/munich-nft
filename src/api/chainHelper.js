import { MunichNftContractAddress, NETWORK } from "../config/config";
import { MUNICH_NFT_ABI } from "../abis/munich-nft";
import { ERC721_ABI } from "../abis/erc721-common";
import { ERC1155_ABI } from "../abis/erc1155-common";

import { OpenSeaPort } from "opensea-js";
import Web3 from "web3";

let seaport;

if (window.web3) {
	seaport = new OpenSeaPort(window.web3.currentProvider, {
		networkName: NETWORK,
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

	const contract = getWeb3Contract(contractAddress, ERC721_ABI,{
		from: walletAddress,
		gasPrice: "20000000",
	});

	const numberOfTokens = await contract.methods.totalSupply().call()
	const tokensOfUser = []
	for (let i = 0; i < numberOfTokens; i++) {
		const owner = await checkOwnershipOfTokenOnERC721Contract(contract, i)
		const ownedByUser = owner.toLowerCase() === walletAddress
		if (ownedByUser) {
			const tokenURI = await requestTokenURIFromContract(contract, i);
			tokensOfUser.push(tokenURI);
		}
	}

	console.log(tokensOfUser);
	return tokensOfUser;
}

const checkOwnershipOfTokenOnERC721Contract = async (contract, tokenId) => {
	return await contract.methods.ownerOf(tokenId).call();
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

	const contract = getWeb3Contract(contractAddress, ERC1155_ABI,{
		from: walletAddress,
		gasPrice: "20000000",
	});

	const numberOfTokens = await contract.methods.totalSupply().call()
	const tokensOfUser = []
	for (let i = 0; i < numberOfTokens; i++ ) {
		const owner = await checkOwnershipOfTokenOnERC1155Contract(contract, walletAddress, i);
		const ownedByUser = owner === walletAddress
		if (ownedByUser) {
			const tokenURI = await requestTokenURIFromContract(contract, i)
			tokensOfUser.push(tokenURI);
		}
	}

	console.log(tokensOfUser);
}

const checkOwnershipOfTokenOnERC1155Contract = async (contract, walletAddress, tokenId) => {
	return await contract.methods.balanceOf(walletAddress, tokenId).call();
}

const requestTokenURIFromContract = async (contract, tokenId) => {
	return await contract.methods.tokenURI(tokenId).call();
}

export const mintNft = async (uploadedMetadata, gas, ownerWalletAddress, contractAddress = MunichNftContractAddress) => {
	if (!window.web3) {
		console.error("window.web3 not present");
		return;
	}

	if (!ownerWalletAddress) {
		console.log("no owner wall addr");
		return ;
	}

	const contract = new window.web3.eth.Contract(MUNICH_NFT_ABI, contractAddress, {
		from: ownerWalletAddress, // default from address
		gasPrice: "2000000000", // default gas price in wei, 20 gwei in this case
	});

	const txResult = await contract.methods
		.mint(ownerWalletAddress, `https://ipfs.io/ipfs/${uploadedMetadata}`)
		.send({
			from: ownerWalletAddress,
			gasPrice: "40000000",
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
	const listing = await seaport.createSellOrder({
		asset: {
			tokenId: resultingTokenId,
			tokenAddress: MunichNftContractAddress,
		},
		accountAddress: ownerWalletAddress,
		startAmount: listingPrice,
		expirationTime,
	});

	return listing;
};

const getWeb3Contract = (contractAddress, abi, options) => {
	if (window.web3) {
		window.web3 = new Web3(window.ethereum);
	}

	const contract = new window.web3.eth.Contract(abi, contractAddress, options);

	return contract;
}
