import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
	getParsedNftAccountsByOwner,
	isValidSolanaAddress,
	createConnectionConfig,
} from "@nfteyez/sol-rayz";
import { SOL_NETWORK } from "../config/config";

//create a connection of devnet
const createConnection = () => {
	return new Connection(clusterApiUrl(SOL_NETWORK));
};

//check solana on window. This is useful to fetch address of your wallet.
const getProvider = () => {
	if ("solana" in window) {
		const provider = window.solana;
		if (provider.isPhantom) {
			return provider;
		}
	}
};

//Function to get all NFT information.
//get NFT
export const fetchSolTokens = async () => {
	try {
		const connect = createConnectionConfig(clusterApiUrl("devnet"));
		const provider = getProvider();
		let ownerToken = provider.publicKey;
		const result = isValidSolanaAddress(ownerToken);
		console.log("result", result);
		const nfts = await getParsedNftAccountsByOwner({
			publicAddress: ownerToken,
			connection: connect,
			serialization: true,
		});

		return nfts;
	} catch (error) {
		console.log(error);
	}
};
