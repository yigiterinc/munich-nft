import React, { useEffect, useState } from "react";

import { MetaMaskButton } from "rimble-ui";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { truncateWalletAddress } from "../../../../utils/commons";
import { getLoggedInUser, isUserLoggedIn, saveLoggedInUserToLocalStorage } from "../../../../utils/auth-utils";
import { createOrFetchUserOnLoginWithMetamask } from "../../../../api/strapi";
import Button from "@material-ui/core/Button";

function MetamaskButton({ user }) {
	const [userLoggedIn, setUserLoggedIn] = useState(false);

	useEffect(() => {
		setUserLoggedIn(isUserLoggedIn());
		window.addEventListener("user-storage", () => setUserLoggedIn(isUserLoggedIn()),
		);

		return () => {
			window.removeEventListener("user-storage", () => setUserLoggedIn(isUserLoggedIn()));
		};
	}, []);

	const loginWithMetamask = async () => {
		await window.ethereum.enable();
		const accounts = await window.web3.eth.getAccounts();

		console.log("hello");
		if (accounts[0]) {
			console.log(accounts[0]);
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
		} else {
			console.log("no account found, show error");
		}
	};

	const metamaskButton = () => {
		return (
			<Button onClick={() => loginWithMetamask()}>Login</Button>
		);
	};

	return (
		userLoggedIn
			? JSON.stringify(getLoggedInUser())
			: metamaskButton()
	);
}

export default MetamaskButton;