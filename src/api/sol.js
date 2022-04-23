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
const TOKEN_PROGRAM_ID = new PublicKey(
	"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

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
	const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
		filters: [
			{
				dataSize: 165,
			},
			{
				memcmp: {
					offset: 32,
					bytes: solAddress,
				},
			},
		],
	});

	return accounts;
};

export const getNftTokenDetails = async (solAddress) => {
	try {
		let ownedNfts = await getAllNftDataByWalletAddress(solAddress);
		let promises = [];

		ownedNfts.forEach((nft) => {
			if (nft.account.data.parsed.info.tokenAmount.decimals !== 0) {
				return;
			}
			if (parseInt(nft.account.data.parsed.info.tokenAmount.amount, 10) <= 0) {
				return;
			}
			promises.push(
				new Promise(async (resolve) => {
					try {
						const nftMetaData = await fetchSolNftMetadata(
							nft.account.data.parsed.info.mint
						);
						if (nftMetaData.data.data.uri === "") {
							resolve();
							return;
						}
						axios.get(nftMetaData.data.data.uri).then((response) => {
							const nftObj = {};
							Object.assign(nftObj, response.data);
							Object.assign(nftObj, nft.account.data.parsed.info);
							resolve(nftObj);
						});
					} catch (ex) {
						console.log("Could not load", nft);
						resolve();
					}
				})
			);
		});
		const result = await Promise.all(promises);
		const nfts = [];
		for (let i = 0; i < result.length; i += 1) {
			if (result[i]) {
				nfts.push(result[i]);
			}
		}
		return nfts;
	} catch (error) {
		console.log(error);
	}
};
