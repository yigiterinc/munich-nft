import React, { useEffect, useState } from "react";

import { MetaMaskButton } from "rimble-ui";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { truncateWalletAddress } from "../../../utils/commons";
import {
	getLoggedInUser,
	isUserLoggedIn,
	saveLoggedInUserToLocalStorage,
} from "../../../utils/auth-utils";
import { createOrFetchUser } from "../../../api/strapi";

const useStyles = makeStyles((theme) => ({
	buttonContainer: {
		width: 139.55,
		height: 48,
	},
	walletPanel: {
		width: "140px",
		height: "48px",
		display: "flex",
		padding: "0.5rem 0.5rem",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		borderColor: theme.palette.primary.main,
		backgroundColor: theme.palette.primary.main,
		border: "1px solid",
		borderRadius: theme.shape.borderRadius,
	},
	walletAddress: {},
}));

function MetamaskButton({ user }) {
	const classes = useStyles();
	const [userLoggedIn, setUserLoggedIn] = useState(false);

	useEffect(() => {
		setUserLoggedIn(isUserLoggedIn());
		window.addEventListener("user-storage", () =>
			setUserLoggedIn(isUserLoggedIn())
		);

		return () => {
			window.removeEventListener("user-storage", () =>
				setUserLoggedIn(isUserLoggedIn())
			);
		};
	}, []);

	const loginWithMetamask = async () => {
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
				<Typography className={classes.walletAddress} variant="h4">
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
			{userLoggedIn ? walletAddress(classes, user) : metamaskButton()}
		</div>
	);
}

export default MetamaskButton;
