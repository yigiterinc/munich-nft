import axios from "axios";
import { SOL_NETWORK } from "../config/config";

const RPC_SERVER = {
	devnet: "http://api.devnet.solana.com",
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
