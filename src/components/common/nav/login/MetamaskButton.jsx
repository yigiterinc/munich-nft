import React from "react";

import { truncateWalletAddress } from "../../../../utils/commons";
import {
	getLoggedInUser,
	isLoggedInWithMetamask,
	loginWithMetamask,
} from "../../../../utils/auth-utils";
import Button from "@material-ui/core/Button";

function MetamaskButton() {
	const metamaskButton = () => {
		return (

			<Button onClick={() => loginWithMetamask()}>
				Login
			</Button>
		);
	};

	return (
		isLoggedInWithMetamask()
			? <Button disabled>{truncateWalletAddress(getLoggedInUser().ethAddress)}</Button>
			: metamaskButton()
	);
}

export default MetamaskButton;