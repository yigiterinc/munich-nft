import axios from "axios";
import Web3 from "web3";

import { ERC1155_ABI } from "../abis/erc1155-common.js"
import { ERC_721_ABI } from "../abis/erc721-common.js"

const web3 = window.web3

export const getErc721TokenDetails = async (tokenId, contractAddress) => {
	const abi = ERC_721_ABI;
	return await getTokenDetails(abi);
}

export const getErc1155TokenDetails = async (tokenId, contractAddress) => {
	const abi = ERC1155_ABI;
	return await getTokenDetails(abi);
}

const getTokenDetails = async (tokenId, contractAddress, abi) => {
	if (!web3) {
		window.web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
	}

	const contract = new web3.eth.Contract(abi, contractAddress);
	const tokens = await contract.methods.balanceOf(contractAddress).call()
	console.log(tokens);

	return tokens;
}