export const STRAPI_BASE_URL = "http://localhost:1337";
export const MUNICH_NFT_USERS_URL = STRAPI_BASE_URL + '/munich-nft-users';
export const IMAGE_UPLOAD_URL = STRAPI_BASE_URL + "/upload"
export const GET_USER_UPDATE_URL = (id) => MUNICH_NFT_USERS_URL + "?id=" + id