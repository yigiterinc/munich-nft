import axios from "axios";

import axiosRetry from "axios-retry";
import { GET_USER_UPDATE_URL, IMAGE_UPLOAD_URL, MUNICH_NFT_USERS_URL } from "../constants/strapiConstants";
import { Image } from "@material-ui/icons";

axiosRetry(axios, { retries: 3, retryDelay: 1000 });

// TODO: should fetch user's collections and their names
export const fetchUserCollections = (address) => {
	return [
		{ name: "Kitty Cats", address: "0x214235a432bc" },
		{ name: "Crypto Kitties", address: "0x214235a432bd" },
		{ name: "Cypherpunk", address: "0x214235a432be" },
	];
};

export const uploadProfileImage = async (image, user) => {
	const formData = new FormData();
	formData.append('files', image);
	console.log(image);

	let uploadResult;
	try {
		uploadResult = await axios.post(IMAGE_UPLOAD_URL, formData);
	} catch (error) {
		console.log('error while uploading image to library: ', error);
	}

	try {
		user.profilePicture = uploadResult;
		const response = await axios.put(GET_USER_UPDATE_URL(user.id), user);
	  return response.data;
	} catch (error) {
		console.log('error while updating user image: ', error);
	}
};

// Fetches if user is already present in DB, otherwise saves to db
export const createOrFetchUser = async (
	{ username, importedCollections, walletAddress, profilePicture }) => {

	let data = {
		username,
		importedCollections,
		walletAddress,
		profilePicture,
	};

	let resp, user;
	try {
		resp = await axios
			.post(MUNICH_NFT_USERS_URL, data);
		user = resp.data

		console.log("user successfully created", user);
	} catch (err) {
		if (err.response?.status === 500) {
			console.log('User already exists, fetching existing user');
			user = await fetchExistingUser(walletAddress);
		} else {
			console.log('Unknown internal server err while fetching user');
		}
	}

	return user;
};

const fetchExistingUser = async (walletAddress) => {
	const url =
		`${MUNICH_NFT_USERS_URL}?walletAddress=${walletAddress}`

	const resp = await axios.get(url);

	return resp.data[0]
}