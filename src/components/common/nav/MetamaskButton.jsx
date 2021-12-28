import React, { useEffect, useState } from "react";

import { MetaMaskButton } from "rimble-ui";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { truncateWalletAddress } from "../../../utils/commons";
import { getLoggedInUser, isUserLoggedIn, saveLoggedInUserToLocalStorage } from "../../../utils/auth-utils";
import { createOrFetchUser } from "../../../api/strapi";

const useStyles = makeStyles({
	buttonContainer: {
		width: 139.55,
		height: 48,
	},
	walletPanel: {
		display: "flex",
		padding: "0.5rem 0.5rem",
		textAlign: "center",
		backgroundColor: "#000",
		color: "#fff",
		alignItems: "center",
		justifyContent: "center",
		border: "1px solid rgb(247, 248, 250)",
		borderRadius: 8,
	},
	walletAddress: {
		fontSize: "1.2rem",
	},
});

function MetamaskButton({ user }) {
	const classes = useStyles();
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


	const walletAddress = (classes, user) => {
		return (
			<div className={classes.walletPanel}>
				<Typography className={classes.walletAddress} variant="h5">
					{truncateWalletAddress(getLoggedInUser().walletAddress)}
				</Typography>
			</div>
		);
	};

	const metamaskButton = () => {
		return (
			<MetaMaskButton onClick={() => loginWithMetamask()} variant="contained">
				Login
			</MetaMaskButton>
		);
	};

	return (
		<div className={classes.buttonContainer}>
			{userLoggedIn
				? walletAddress(classes, user)
				: metamaskButton()}
		</div>
	);
}

export default MetamaskButton;