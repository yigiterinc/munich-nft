export function truncateWalletAddress(address) {
	if (!address) return;

	const separator = "...";
	const firstHalf = address.substr(0, 6);
	const secondHalf = address.substr(address.length - 4);

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
};

export const convertToSlug = (galleryName) => {
	return galleryName.toLowerCase().replaceAll(" ", "_");
};