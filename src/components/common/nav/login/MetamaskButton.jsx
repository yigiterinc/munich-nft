import React from "react";

import { truncateWalletAddress } from "../../../../utils/commons";
import {
	getLoggedInUser,
	isLoggedInWithMetamask,
} from "../../../../utils/auth-utils";
import { Typography } from "@material-ui/core";

function MetamaskButton() {
	const metamaskButton = () => {
		return (
			<Typography style={{ fontSize: 14, marginLeft: 8 }}>
				LOGIN WITH METAMASK
			</Typography>
		);
	};

	return isLoggedInWithMetamask() ? (
		<Typography style={{ fontSize: 14, marginLeft: 8 }}>
			{truncateWalletAddress(getLoggedInUser().ethAddress)}
		</Typography>
	) : (
		metamaskButton()
	);
}

export default MetamaskButton;
