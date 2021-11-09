import axios from "axios";

export const convertEthToUsd = async (eth) => {
	const endpoint =
		"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
	const resp = axios.get(endpoint);
	console.log(resp);
	return resp.data.USD * eth;
};

export const convertWeiToEth = (wei_price) => {
	return wei_price * 10 ** -18;
};
