import axios from "axios";

export const getCurrentEthPrice = async () => {
	const endpoint =
		"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
	const resp = await axios.get(endpoint);
	const data = resp.data;

	return data["USD"];
};

export const priceHelperForOpensea = (price) => {
	return price.slice(0, price.lastIndexOf(".")) * 10 ** -18;
};
