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

const connectionMain = new Connection("https://api.mainnet-beta.solana.com");

export const fetchSolNftMetadata = async (mintAddress) => {
	let mintPubkey = new PublicKey(mintAddress);
	let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
	const tokenmeta = await Metadata.load(connectionMain, tokenmetaPubkey);

	return tokenmeta;
};

export const getSolNftDetailsFromUri = async (tokenmeta) => {
	let metadata = await axios.get(tokenmeta.data.data.uri);
	tokenmeta.data.image = metadata.data.image;
	tokenmeta.data.description = metadata.data.description;
	tokenmeta.data.attributes = metadata.data.attributes;
	tokenmeta.data.background_color = metadata.data.background_color;

	return tokenmeta.data;
};

export const getAllNftDataByWalletAddress = async (solAddress) => {
	const connect = createConnectionConfig(clusterApiUrl("devnet"));
	const nfts = await getParsedNftAccountsByOwner({
		publicAddress: solAddress,
		connection: connect,
		serialization: true,
	});

	return nfts;
};

export const getNftTokenDetails = async (solAddress) => {
	try {
		let nftData = await getAllNftDataByWalletAddress(solAddress);
		let nftTokenDetails = [];
		let promises = [];

		nftData.forEach((nft) =>
			promises.push(
				axios.get(nft.data.uri).then((response) => {
					nftTokenDetails.push(response.data);
				})
			)
		);
		await Promise.all(promises);

		nftTokenDetails.map((nft) => {
			delete Object.assign(nft, { image_url: nft.image }).image;
		});

		return nftTokenDetails;
	} catch (error) {
		console.log(error);
	}
};
