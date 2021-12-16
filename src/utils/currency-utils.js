import web3 from "web3";

export const formatOpenseaPrice = (price) => {
	let weiPrice = removeDigitsAfterDot(price);
	let ethPrice = convertWeiToEth(weiPrice);
	return ethPrice;
};

const removeDigitsAfterDot = (price) => {
	return price.slice(0, price.lastIndexOf("."));
};

const convertWeiToEth = (wei) => {
	return web3.utils.fromWei(wei, "ether");
};

export const countDecimals = (value) => {
	let text = value.toString();
	return text.split(".")[1].length;
};
