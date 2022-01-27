import axios from "axios";
import { SOL_NETWORK } from "../config/config";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import {
	getParsedNftAccountsByOwner,
	createConnectionConfig,
} from "@nfteyez/sol-rayz";

const RPC_SERVER = {
	devnet: "https://api.devnet.solana.com",
};

const connection = new Connection("https://api.devnet.solana.com");

export const fetchSolNftMetadata = async () => {
	let mintPubkey = new PublicKey(
		"7RQFGy4qkn1ogyKY6QRcdmWYXFZqnxRxUt5VzyARDZAL"
	);
	let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);

	const tokenmeta = await Metadata.load(connection, tokenmetaPubkey);
	console.log(tokenmeta);
};

export const getAllNftDataByWalletAddress = async (solAddress) => {
	const connect = createConnectionConfig(clusterApiUrl("devnet"));
	const nfts = await getParsedNftAccountsByOwner({
		publicAddress: solAddress,
		connection: connect,
		serialization: true,
	});

	const nftDetails = nfts.map((nft) => nft.data);
	nftDetails.forEach(async (detail, i) => {
		let metadata = await axios.get(detail.uri);
		nfts[i].image = metadata.data.image;
	});

	return nfts;
};
