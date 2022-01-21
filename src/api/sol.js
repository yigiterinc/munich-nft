import axios from "axios";
import { SOL_NETWORK } from "../config/config";

const RPC_SERVER = {
	devnet: "http://api.devnet.solana.com",
};

export const fetchSolTokensByWalletAddress = async (solAddress) => {
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

		const tokenAccounts = await axios.post(RPC_SERVER[SOL_NETWORK], data);

		return tokenAccounts;
	} catch (error) {
		console.log(error);
	}
};
