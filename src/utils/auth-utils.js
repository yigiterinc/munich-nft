import { createOrFetchUserOnLoginWithMetamask, createOrFetchUserOnLoginWithPhantom, updateUser } from "../api/strapi";

const USER_LOCAL_STORAGE_KEY = "user";

export const saveLoggedInUserToLocalStorage = (userData) => {
	saveToLocalStorage(USER_LOCAL_STORAGE_KEY, JSON.stringify(userData));
	window.dispatchEvent(new Event("user-storage"));
	console.log(JSON.parse(localStorage.getItem("user")));
};

export const logout = async () => {
	await window?.solana.disconnect();
	removeLoggedInUserFromLocalStorage();
};

export const removeLoggedInUserFromLocalStorage = () => {
	localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
	window.dispatchEvent(new Event("user-storage"));
};

export const getLoggedInUser = () => {
	if (!isUserLoggedIn()) {
		console.log("user was not logged in while attempting to read user");
		return;
	}

	return readFromLocalStorage(USER_LOCAL_STORAGE_KEY);
};

export const isLoggedInWithPhantom = () => {
	if (!isUserLoggedIn()) return false;

	return "phantom" in getLoggedInUser().connectedWallets;
};

export const isLoggedInWithMetamask = () => {
	if (!isUserLoggedIn()) return false;

	return "metamask" in getLoggedInUser().connectedWallets;
};


export const loginWithPhantom = async () => {
	const address = window.solana.publicKey.toString();
	if (isUserLoggedIn()) {
		await handleLoginWhenAnotherWalletIsAlreadyLoggedIn("SOL", address);
		return;
	}

	const user = await createOrFetchUserOnLoginWithPhantom({
		solAddress: address,
	});

	if (!user) {
		console.log("error while creating or fetching user");
		return;
	}

	addToLoggedInWallets(user, { phantom: true });
	saveLoggedInUserToLocalStorage(user);
};

const addToLoggedInWallets = (user, kvPairs) => {
	if (user.connectedWallets) {
		user.connectedWallets = { ...user.connectedWallets, ...kvPairs };
	} else {
		user.connectedWallets = kvPairs;
	}
};

const handleLoginWhenAnotherWalletIsAlreadyLoggedIn = async (nowLoggingInWith, walletAddress) => {
	let user = getLoggedInUser();
	const loggingWithSol = nowLoggingInWith === "SOL";
	let nameOfAddressPropertyToBeSet = loggingWithSol ? "solAddress" : "ethAddress";
	user[nameOfAddressPropertyToBeSet] = walletAddress;
	const connectedWallet = loggingWithSol ? "phantom" : "metamask";
	addToLoggedInWallets(user, { [connectedWallet]: true });
	await updateUser(user);
	saveLoggedInUserToLocalStorage(user);
};

export const loginWithMetamask = async () => {
	await window.ethereum.enable();
	const accounts = await window.web3.eth.getAccounts();
	const address = accounts[0].toLowerCase();

	if (!accounts[0]) {
		console.log("No logged in account found, show error");
		return;
	}

	if (isUserLoggedIn()) {
		await handleLoginWhenAnotherWalletIsAlreadyLoggedIn("ETH", address);
		return;
	}

	const user = await createOrFetchUserOnLoginWithMetamask({
		ethAddress: address,
	});

	if (!user) {
		console.log("error while creating or fetching user");
		return;
	}

	addToLoggedInWallets(user, { metamask: true });
	saveLoggedInUserToLocalStorage(user);
};

export const isUserLoggedIn = () => {
	return getUserLoggedInStatus() === "Logged in";
};

const getUserLoggedInStatus = () => {
	if (readFromLocalStorage(USER_LOCAL_STORAGE_KEY) === null) {
		return "Not logged in";
	}

	return "Logged in";
};

const saveToLocalStorage = (key, data) => {
	window.dispatchEvent(new Event("storage"));
	localStorage.setItem(key, data);
};

const readFromLocalStorage = (key) => {
	window.dispatchEvent(new Event("storage"));
	return JSON.parse(localStorage.getItem(key));
};