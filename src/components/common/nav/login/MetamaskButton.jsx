import React, { useEffect, useState } from "react";

import { MetaMaskButton } from "rimble-ui";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { truncateWalletAddress } from "../../../../utils/commons";
import { getLoggedInUser, isUserLoggedIn, saveLoggedInUserToLocalStorage } from "../../../../utils/auth-utils";
import { createOrFetchUser } from "../../../../api/strapi";
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

		if (accounts[0]) {
			console.log(accounts[0]);
			const user = await createOrFetchUser({
				username: "Alien",
				walletAddress: accounts[0].toLowerCase(),
			});

			saveLoggedInUserToLocalStorage(user);
		} else {
			console.log("no account found, show error");
		}
	};

	const metamaskButton = () => {
		return (
			<p onClick={() => loginWithMetamask()}>Login</p>
		);
	};

	return (
		userLoggedIn
			? truncateWalletAddress(getLoggedInUser().walletAddress)
			: metamaskButton()
	);
}

export default MetamaskButton;