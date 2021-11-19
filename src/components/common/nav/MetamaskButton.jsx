import React from "react";

import Button from "@material-ui/core/Button";

function MetamaskButton({onWalletConnection}) {
	const loginWithMetamask = async () => {
		const accounts = await window.web3.eth.getAccounts();
		onWalletConnection(accounts[0].toLowerCase());
	}

	return (
		<Button onClick={() => loginWithMetamask()} variant="contained">
			Connect with Metamask
		</Button>
	);
}

export default MetamaskButton;
