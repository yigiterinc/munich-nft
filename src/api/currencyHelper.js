import axios from "axios";

export const getCurrentCryptoPriceInCurrency = async (crypto, currency) => {
	const endpoint = `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${currency}`;
	const resp = await axios.get(endpoint);
	const data = resp.data;

	return data[`${currency}`];
};
