import React, { useEffect, useState } from "react";

import { truncateWalletAddress } from "../../../../utils/commons";
import {
	getLoggedInUser,
	isUserLoggedIn,
	isLoggedInWithMetamask,
	saveLoggedInUserToLocalStorage,
} from "../../../../utils/auth-utils";
import { createOrFetchUserOnLoginWithMetamask, updateUser } from "../../../../api/strapi";
import Button from "@material-ui/core/Button";

function MetamaskButton({ user }) {
	const [loggedInWithMetamask, setLoggedInWithMetamask] = useState(false);

	useEffect(() => {
		setLoggedInWithMetamask(isLoggedInWithMetamask());
		window.addEventListener("user-storage", () => updateComponentStateFromLocalStorage());

		return () => {
			window.removeEventListener("user-storage", () => updateComponentStateFromLocalStorage());
		};
	}, []);

	const updateComponentStateFromLocalStorage = () => {
		const localStorageLoginStatus = isLoggedInWithMetamask()
		setLoggedInWithMetamask(localStorageLoginStatus);
	}

	const loginWithMetamask = async () => {
		await window.ethereum.enable();
		const accounts = await window.web3.eth.getAccounts();

		if (!accounts[0]) {
			console.log("No logged in account found, show error");
			return;
		}

		const handleAlreadyLoggedInUser = async () => {
			let loggedInUser = getLoggedInUser();
			user.ethAddress = accounts[0].toLowerCase();
			if (user.connectedWallets) {
				user.connectedWallets = { ...user.connectedWallets, metamask: true };
			} else {
				user.connectedWallets = { metamask: true };
			}

			await updateUser(user);
			saveLoggedInUserToLocalStorage(loggedInUser);
		};

		if (isUserLoggedIn()) {
			await handleAlreadyLoggedInUser();
			return;
		}

		const user = await createOrFetchUserOnLoginWithMetamask({
			ethAddress: accounts[0].toLowerCase(),
		});


		if (!user) {
			console.log("error while creating or fetching user");
			return;
		}

		if (user.connectedWallets) {
			user.connectedWallets = { ...user.connectedWallets, metamask: true };
		} else {
			user.connectedWallets = { metamask: true };
		}

		saveLoggedInUserToLocalStorage(user);
	};

	const metamaskButton = () => {
		return (
			<Button onClick={() => loginWithMetamask()}>Login</Button>
		);
	};

	return (
		isLoggedInWithMetamask()
			? <Button disabled>{truncateWalletAddress(getLoggedInUser().ethAddress)}</Button>
			: metamaskButton()
	);
}

export default MetamaskButton;