import axios from "axios";

import {
	FETCH_ACCOUNT_COLLECTIONS_ENDPOINT,
	FETCH_ASSETS_IN_COLLECTION_ENDPOINT,
	FETCH_SINGLE_ASSET_ENDPOINT,
	FETCH_SINGLE_COLLECTION_ENDPOINT,
} from "../constants/openseaApiConstants";

export const fetchCollectionsOfUser = async (accountAddress) => {
	if (!accountAddress) return;

	const endpoint = FETCH_ACCOUNT_COLLECTIONS_ENDPOINT(accountAddress);
	const resp = await axios.get(endpoint);
	const data = resp.data;

	return data;
};

/* 
	Receives collection, sends a request to opensea to get the assets in this collection
	an array that contains objects of {collection: {}, assets: []}
*/
export const getAssetsAddedCollections = async (collections) => {
	let collectionsWithAssets = [];
	let promises = [];
	collections.forEach((coll) => {
		promises.push(
			fetchAssetsInCollection(coll.slug).then((response) => {
				let assets = response?.data?.assets;
				collectionsWithAssets.push({
					...coll,
					assets,
				});
			})
		);
	});

	await Promise.all(promises);
	return collectionsWithAssets;
};

// * Not await because
// * We need to make api calls inside for loop => this fnc. needs to return Promise
export const fetchAssetsInCollection = async (slug) => {
	if (!slug) return;

	const endpoint = FETCH_ASSETS_IN_COLLECTION_ENDPOINT(slug);
	return axios.get(endpoint);
};

export const fetchSingleAsset = async (contractAddress, tokenId) => {
	const endpoint = FETCH_SINGLE_ASSET_ENDPOINT(contractAddress, tokenId);
	const resp = await axios.get(endpoint);
	const data = resp.data;

	return data;
};

export const fetchSingleCollectionMetadata = async (slug) => {
	const endpoint = FETCH_SINGLE_COLLECTION_ENDPOINT(slug);
	const resp = await axios.get(endpoint);
	return resp.data;
};
