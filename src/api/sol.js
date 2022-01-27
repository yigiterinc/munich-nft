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
	return nfts;
};

export const getNftTokenData = async (solAddress) => {
	try {
		let nftData = await getAllNftDataByWalletAddress(solAddress);
		var data = Object.keys(nftData).map((key) => nftData[key]);
		let arr = [];
		let n = data.length;
		for (let i = 0; i < n; i++) {
			console.log(data[i].data.uri);
			let val = await axios.get(data[i].data.uri);
			arr.push(val);
		}
		return arr;
	} catch (error) {
		console.log(error);
	}
};

export const fetchSolNftsByWalletAddress = async (solAddress) => {
	try {
		const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
		const data = {
			jsonrpc: "2.0",
			id: 1,
			method: "getTokenAccountsByOwner",
			params: [
				solAddress,
				{
					programId: TOKEN_PROGRAM_ID,
				},
				{
					encoding: "jsonParsed",
				},
			],
		};

		const resp = await axios.post(RPC_SERVER[SOL_NETWORK], data);
		const tokenAccountObjects = resp.data.result.value;
		console.log(tokenAccountObjects);
		const mints = tokenAccountObjects.map(
			(tokenAcc) => tokenAcc.account.data.parsed.info.mint
		);
		const tokenListReq = await axios.get(
			"https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json"
		);
		const solanaTokensList = tokenListReq.data.tokens;

		const metadataOfTokens = solanaTokensList.filter((tokenDescription) =>
			mints.includes(tokenDescription.address)
		);

		console.log(metadataOfTokens);

		return metadataOfTokens;
	} catch (error) {
		console.log(error);
	}
};
