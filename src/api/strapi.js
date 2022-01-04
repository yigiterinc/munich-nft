import axios from "axios";
import {
	GALLERIES_URL,
	GET_USER_UPDATE_URL,
	IMAGE_UPLOAD_URL,
	USER_GALLERIES_URL,
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

export const uploadImageToMediaGallery = async (image) => {
	const formData = new FormData();
	formData.append("files", image);
	console.log(image);

	let uploadResult;
	try {
		uploadResult = await axios.post(IMAGE_UPLOAD_URL, formData);
		console.log("upload", uploadResult);
		return uploadResult;
	} catch (error) {
		console.log("error while uploading image to library: ", { error });
	}
};

export const changeUserProfilePicture = async (image, user) => {
	user.profilePicture = image.data[0];
	console.log(user, GET_USER_UPDATE_URL(user.id));
	return await updateUser(user);
};

export const changeUserBannerImage = async (image, user) => {
	user.bannerImage = image.data[0];
	console.log(user, GET_USER_UPDATE_URL(user.id));
	return await updateUser(user);
};

// Fetches if user is already present in DB, otherwise saves to db
export const createOrFetchUser = async ({
	username,
	importedCollections,
	walletAddress,
	profilePicture,
}) => {
	let data = {
		username,
		importedCollections,
		walletAddress,
		profilePicture,
	};

	let resp, user;
	try {
		resp = await axios.post(MUNICH_NFT_USERS_URL, data);
		user = resp.data;

		console.log("user successfully created", user);
	} catch (err) {
		if (err.response?.status === 500) {
			console.log("User already exists, fetching existing user");
			user = await fetchExistingUser(walletAddress);
		} else {
			console.log("Unknown internal server err while fetching user");
		}
	}

	return user;
};

export const fetchExistingUser = async (walletAddress) => {
	const url = `${MUNICH_NFT_USERS_URL}?walletAddress=${walletAddress}`;
	const resp = await axios.get(url);

	return resp.data[0];
};

export const fetchExistingUserWithId = async (userId) => {
	const url = `${MUNICH_NFT_USERS_URL}?id=${userId}`;

	return await axios.get(url);
};

export const updateUser = async (user) => {
	console.log(GET_USER_UPDATE_URL(user.id));
	const response = await axios.put(GET_USER_UPDATE_URL(user.id), user);
	console.log(response);
	return response.data;
};

export const createGallery = async (gallery) => {
	return await axios.post(GALLERIES_URL, gallery);
};

export const updateGallery = async (galleryId, updatedGalleryParams) => {
	return await axios.put(`${GALLERIES_URL}/${galleryId}`, updatedGalleryParams);
};

export const saveImportedCollections = async (user, collectionsToSave) => {
	user.importedCollections = collectionsToSave;
	return await updateUser(user);
};

export const saveImportedNfts = async (user, selectedCollectionNftPairs) => {
	selectedCollectionNftPairs.map((collectionNftPair) => {
		let existingCollectionInStrapi = user.importedCollections.find(
			(collection) => collection.slug === collectionNftPair.collection.slug
		);

		if (existingCollectionInStrapi) {
			existingCollectionInStrapi.assets.push(collectionNftPair.nft);
		} else {
			const allAssetsFromOpenseaInThisCollection =
				collectionNftPair.collection.assets;

			const selectedAssetsOnly = allAssetsFromOpenseaInThisCollection.filter(
				(asset) =>
					anySelectedCollectionNftPairContainsThisAsset(
						asset,
						selectedCollectionNftPairs
					)
			);

			collectionNftPair.collection.assets = selectedAssetsOnly;
			user.importedCollections.push(collectionNftPair.collection);
		}
	});

	return await updateUser(user);
};
export const convertSelectedNftsToGalleryAssets = (
	selectedNftCollectionPairs
) => {
	if (!selectedNftCollectionPairs) return;
	let galleryAssets = [];
	selectedNftCollectionPairs.forEach((pair) => {
		const galleryAsset = {
			...pair.nft,
		};

		galleryAsset.collection = {
			name: pair.collection.name,
			slug: pair.collection.slug,
		};

		galleryAssets.push(galleryAsset);
	});

	return galleryAssets;
};

const anySelectedCollectionNftPairContainsThisAsset = (
	asset,
	selectedCollectionNftPairs
) => {
	return selectedCollectionNftPairs.some(
		(nftCollection) => nftCollection.nft === asset
	);
};

export const fetchUserGalleries = async (userId) => {
	if (!userId) return;
	const resp = await axios.get(USER_GALLERIES_URL(userId.substring(0, 25)));
	console.log(resp);
	return resp.data;
};

export const fetchGallery = async (slug) => {
	const url = `${GALLERIES_URL}?slug=${slug}`;
	const resp = await axios.get(url);

	return resp.data[0];
};

export const updateUserProfile = async (
	username,
	bio,
	email,
	profileImage,
	bannerImage,
	user
) => {
	user.username = username;
	user.bio = bio;
	user.email = email;
	if (profileImage) {
		user.profilePicture = profileImage.data[0];
	}
	if (bannerImage) {
		user.bannerImage = bannerImage.data[0];
	}

	return await axios.put(GET_USER_UPDATE_URL(user.id), user);
};
