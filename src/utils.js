export function truncateAddress(str, strLen) {
	if (str.length <= strLen) return str;

	const separator = "...";

	const sepLen = separator.length;
	const charsToShow = strLen - sepLen;
	const frontChars = Math.ceil(charsToShow / 2);
	const backChars = Math.floor(charsToShow / 2);

	return (
		str.substr(0, frontChars) + separator + str.substr(str.length - backChars)
	);
}
