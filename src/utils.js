export function truncateWalletAddress(address, limit) {
	if (!address) return;

	if (address.length <= limit) return address;

	const separator = "...";

	const shownCharCount = limit - separator.length;
	const firstHalf = address.substr(0, Math.ceil(shownCharCount / 2));
	const secondHalf = address.substr(address.length, Math.floor(shownCharCount / 2));

	return firstHalf + separator + secondHalf;
}

export const truncateString = (str, num) => {
	if (!str || str.length <= num) {
		return str;
	}
	return str.slice(0, num) + "...";
};

export const withDefault = (value, defaultValue) => {
	return value ? value : defaultValue;
}

