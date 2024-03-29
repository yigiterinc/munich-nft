import { NETWORK_FOR_OPENSEA_API } from "../config/config";

const RINKEBY_COLLECTIONS_BASE_URL = "https://rinkeby-api.opensea.io/api/v1";
const RINKEBY_BASE_URL = "https://testnets.opensea.io/assets";

const MAINNET_COLLECTIONS_BASE_URL = "https://api.opensea.io/api/v1";
const MAINNET_BASE_URL = "https://opensea.io/assets";

export const OPENSEA_COLLECTIONS_BASE_URL =
	NETWORK_FOR_OPENSEA_API === "main"
		? MAINNET_COLLECTIONS_BASE_URL
		: RINKEBY_COLLECTIONS_BASE_URL;

export const OPENSEA_BASE_URL =
	NETWORK_FOR_OPENSEA_API === "main" ? MAINNET_BASE_URL : RINKEBY_BASE_URL;

export const FETCH_ACCOUNT_COLLECTIONS_ENDPOINT = (
	account,
	offset = 0,
	limit = 300
) =>
	`${OPENSEA_COLLECTIONS_BASE_URL}/collections?asset_owner=${account}&offset=${offset}&limit=${limit}`;

export const FETCH_ASSETS_IN_COLLECTION_ENDPOINT = (
	slug,
	offset = 0,
	limit = 20
) =>
	`${OPENSEA_COLLECTIONS_BASE_URL}/assets?order_direction=desc&offset=${offset}&limit=${limit}&collection=${slug}`;

export const FETCH_SINGLE_ASSET_ENDPOINT = (contractAddress, tokenId) =>
	`${OPENSEA_COLLECTIONS_BASE_URL}/asset/${contractAddress}/${tokenId}`;

export const FETCH_SINGLE_COLLECTION_ENDPOINT = (slug) =>
	`${OPENSEA_COLLECTIONS_BASE_URL}/collection/${slug}`;
