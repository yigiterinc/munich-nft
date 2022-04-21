import axios from "axios";

import { MunichNftContractAddress, ETH_NETWORK } from "../config/config";

import {
	FETCH_ACCOUNT_COLLECTIONS_ENDPOINT,
	FETCH_ASSETS_IN_COLLECTION_ENDPOINT,
	FETCH_SINGLE_ASSET_ENDPOINT,
	FETCH_SINGLE_COLLECTION_ENDPOINT,
} from "../constants/openseaApiConstants";
import { getLoggedInUser } from "../utils/auth-utils";

import { OpenSeaPort } from "opensea-js";
import Web3 from "web3";

let seaport;

if (window.web3) {
	seaport = new OpenSeaPort(window.web3.currentProvider, {
		networkName: ETH_NETWORK,
	});
}

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

const userSoldTheAsset = (asset, tx, walletAddress) => {
	if (!asset.last_sale.event_type === "successful") return false;

	if (
		tx.from !== walletAddress &&
		tx.logs[0]?.data.indexOf(walletAddress) >= 0
	) {
		return true;
	} else if (
		tx.from === walletAddress &&
		tx.logs[0]?.data.indexOf(walletAddress) < 0
	) {
		return tx.logs.length > 2;
	} else if (tx.from === tx.logs[0]?.data.substring(0, 42)) {
		return true;
	}

	return false;
};

const assetBelongsToCurrentUser = async (asset, walletAddress) => {
	if (asset.owner.address === walletAddress) {
		return true;
	}

	if (!asset.last_sale) {
		return asset.creator.address === walletAddress;
	}

	window.web3.defaultChain = "rinkeby";
	const txHash = asset.last_sale.transaction.transaction_hash;
	console.log(txHash);
	const tx = await window.web3.eth.getTransactionReceipt(txHash);

	if (!tx || userSoldTheAsset(asset, tx, walletAddress)) {
		return false;
	}

	return tx.logs[0].topics.join().indexOf(walletAddress.substring(3)) >= 0;
};

export const filterAssetsInCollectionByOwner = async (collectionWithAssets) => {
	let filteredCollections = collectionWithAssets[0];
	let currCollection;
	for (let i = 0; i < filteredCollections.length; i++) {
		let assetsOfUserInCurrCollection = [];
		currCollection = filteredCollections[i];

		let asset;
		for (let i = 0; i < currCollection.assets.length; i++) {
			asset = currCollection.assets[i];

			if (
				await assetBelongsToCurrentUser(asset, getLoggedInUser().ethAddress)
			) {
				assetsOfUserInCurrCollection.push(asset);
			}
		}

		filteredCollections[i].assets = assetsOfUserInCurrCollection;
	}

	return filteredCollections;
};

export const listNftOnOpensea = async (
	expirationTime,
	resultingTokenId,
	listingPrice,
	ownerWalletAddress
) => {
	const listing = await seaport.createSellOrder({
		asset: {
			tokenId: resultingTokenId,
			tokenAddress: MunichNftContractAddress,
		},
		accountAddress: ownerWalletAddress,
		startAmount: listingPrice,
		expirationTime,
	});

	return listing;
};
