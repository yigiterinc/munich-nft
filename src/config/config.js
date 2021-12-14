export const NETWORK_FOR_OPENSEA_API = "rinkeby"; // ! set to rinkeby or main, upper/lowercase matters
export const NETWORK = "rinkeby"; // * network to be used while making calls to our contract
export const CONTRACT_ADDRESS_RINKEBY =
	"0x4548DD86a34BcFddB21186A49d5096172cd95b15"; // * address of deployed contract

const NETWORK_CONTRACT_ADDRESS = {
	rinkeby: CONTRACT_ADDRESS_RINKEBY,
};

export const getMunichNftContractAddress = () =>
	NETWORK_CONTRACT_ADDRESS[NETWORK];
