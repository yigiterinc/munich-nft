import React from "react";

import { MetaMaskButton } from "rimble-ui";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { truncateWalletAddress } from "../../../utils/commons";

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
function MetamaskButton({ user, onWalletConnection }) {
	const classes = useStyles();

	const loginWithMetamask = async () => {
		const accounts = await window.web3.eth.getAccounts();
		onWalletConnection(accounts[0].toLowerCase());
	};

	const isLoggedIn = user !== null && user !== undefined;

	return (
		<div className={classes.buttonContainer}>
			{isLoggedIn
				? renderWalletAddress(classes, user)
				: renderMetaMaskButton(loginWithMetamask)}
		</div>
	);
}

const renderWalletAddress = (classes, user) => {
	return (
		<div className={classes.walletPanel}>
			<Typography className={classes.walletAddress} variant="h5">
				{truncateWalletAddress(user.walletAddress)}
			</Typography>
		</div>
	);
};

const renderMetaMaskButton = (loginWithMetamask) => {
	return (
		<MetaMaskButton onClick={() => loginWithMetamask()} variant="contained">
			Login
		</MetaMaskButton>
	);
};

export default MetamaskButton;