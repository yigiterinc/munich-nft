import axios from "axios";

import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3, retryDelay: 1000 });

// TODO: should fetch user's collections and their names
export const fetchUserCollections = (address) => {
	return [
		{ name: "Kitty Cats", address: "0x214235a432bc" },
		{ name: "Crypto Kitties", address: "0x214235a432bd" },
		{ name: "Cypherpunk", address: "0x214235a432be" },
	];
};

export const uploadImage = async () => {

};

export const createUser = async ({ username, importedCollections, walletAddress, profilePicture, }) => {

	let user = {
		username,
		importedCollections,
		walletAddress,
		profilePicture,
	};

	let upload;
	try {
		upload = await axios.post("http://localhost:1337/munich-nft-users", user);
		console.log("user successfully created", upload.data);
		return upload;
	} catch (err) {
		console.error(err);
	}
};