export const NETWORK_FOR_OPENSEA_API = "rinkeby"; // ! set to rinkeby or main, upper/lowercase matters
export const ETH_NETWORK = "rinkeby"; // * network to be used while making calls to our contract
export const SOL_NETWORK = "mainnet"; // set to mainnet or devnet
export const CONTRACT_ADDRESS_RINKEBY =
	"0xE0622Ca84fe2aCD5a997579A1573c83F38a330C6"; // * address of deployed contract

const NETWORK_CONTRACT_ADDRESS = {
	rinkeby: CONTRACT_ADDRESS_RINKEBY,
};

export const MunichNftContractAddress = NETWORK_CONTRACT_ADDRESS[ETH_NETWORK];
