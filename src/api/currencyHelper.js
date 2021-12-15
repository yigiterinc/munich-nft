import axios from "axios";

export const getCurrentEthPrice = async () => {
	const endpoint =
		"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
	const resp = await axios.get(endpoint);
	const data = resp.data;

	return data["USD"];
};

export const priceHelperForOpensea = (price) => {
	let weiPrice = removeDigitsAfterDot(price);
	let ethPrice = convertWeiToEth(weiPrice);
	return ethPrice;
};

const removeDigitsAfterDot = (price) => {
	return price.slice(0, price.lastIndexOf("."));
};

const convertWeiToEth = (wei) => {
	return wei * 10 ** -18;
};

export const countDecimals = (value) => {
	if (Math.floor(value) !== value)
		return value.toString().split(".")[1].length || 0;
	return 0;
};
