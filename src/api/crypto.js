import axios from "axios";

export const convertEthToUsd = async (eth) => {
	// will be used in the future
	const endpoint =
		"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
	const resp = axios.get(endpoint);
	console.log(resp);
	return resp.data.USD * eth;
};
