import axios from "axios";
import { SOL_NETWORK } from "../config/config";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import {
	getParsedNftAccountsByOwner,
	createConnectionConfig,
} from "@nfteyez/sol-rayz";

let connection;
let connect;

if (SOL_NETWORK === "mainnet") {
	connection = new Connection("https://api.mainnet-beta.solana.com");
	connect = createConnectionConfig(clusterApiUrl("mainnet-beta"));
}

if (SOL_NETWORK === "devnet") {
	connection = new Connection("https://api.devnet.solana.com");
	connect = createConnectionConfig(clusterApiUrl("devnet"));
}

export const fetchSolNftMetadata = async (mintAddress) => {
	let mintPubkey = new PublicKey(mintAddress);
	let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
	const tokenmeta = await Metadata.load(connection, tokenmetaPubkey);

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
