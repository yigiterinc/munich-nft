const USER_LOCAL_STORAGE_KEY = "user";

export const saveLoggedInUserToLocalStorage = (userData) => {
	saveToLocalStorage(USER_LOCAL_STORAGE_KEY, JSON.stringify(userData));
	window.dispatchEvent(new Event("user-storage"));
	console.log(JSON.parse(localStorage.getItem("user")));
};

export const removeLoggedInUserFromLocalStorage = () => {
	localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
	window.dispatchEvent(new Event("user-storage"));
	console.log(JSON.parse(localStorage.getItem("user")));
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