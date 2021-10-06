import axios from "axios";

import axiosRetry from "axios-retry";

import {
	FETCH_ACCOUNT_COLLECTIONS_ENDPOINT,
	FETCH_ASSETS_IN_COLLECTION_ENDPOINT,
} from "../constants/openseaApiConstants";

axiosRetry(axios, { retries: 3, retryDelay: 1000 });

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
				let assets = response.data.assets;
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

// * Not async/await because
// * We need to make api calls inside for loop => this fnc. needs to return Promise
const fetchAssetsInCollection = async (slug) => {
	if (!slug) return;

	const endpoint = FETCH_ASSETS_IN_COLLECTION_ENDPOINT(slug);
	return axios.get(endpoint);
};
