export const STRAPI_BASE_URL = "http://localhost:1337";
export const MUNICH_NFT_USERS_URL = STRAPI_BASE_URL + "/munich-nft-users";
export const IMAGE_UPLOAD_URL = STRAPI_BASE_URL + "/upload";
export const GET_USER_UPDATE_URL = (id) => MUNICH_NFT_USERS_URL + "/" + id;
export const GALLERIES_URL = STRAPI_BASE_URL + "/galleries";
export const GALLERY_URL = (id) => STRAPI_BASE_URL + "/galleries/" + id;
export const USER_GALLERIES_URL = (id) => GALLERIES_URL + "?userId=" + id;
