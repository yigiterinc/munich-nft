import axios from "axios";
import {
	GET_USER_UPDATE_URL,
	IMAGE_UPLOAD_URL,
	MUNICH_NFT_USERS_URL,
} from "../constants/strapiConstants";

// TODO: should fetch user's collections and their names
export const fetchUserCollections = (address) => {
	return [
		{ name: "Kitty Cats", address: "0x214235a432bc" },
		{ name: "Crypto Kitties", address: "0x214235a432bd" },
		{ name: "Cypherpunk", address: "0x214235a432be" },
	];
};

export const uploadProfileImage = async (image) => {
	const formData = new FormData();
	formData.append('files', image);
	console.log(image);

	let uploadResult;
	try {
		uploadResult = await axios.post(IMAGE_UPLOAD_URL, formData);
		console.log("upload", uploadResult);
		return uploadResult;
	} catch (error) {
		console.log('error while uploading image to library: ', { error });
	}
};

export const changeUserProfilePicture = async (image, user) => {
		user.profilePicture = image.data[0];
		console.log(user, GET_USER_UPDATE_URL(user.id));
		const response = await axios.put(GET_USER_UPDATE_URL(user.id), user);
		return response.data;
}

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

export const fetchExistingUser = async (walletAddress) => {
	const url =
		`${MUNICH_NFT_USERS_URL}?walletAddress=${walletAddress}`

	const resp = await axios.get(url);

	return resp.data[0]
}