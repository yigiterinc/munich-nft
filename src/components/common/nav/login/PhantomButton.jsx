import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import {
	getLoggedInUser,
	isLoggedInWithPhantom,
} from "../../../../utils/auth-utils";
import { truncateWalletAddress } from "../../../../utils/commons";

const PhantomButton = () => {
	const ShownText = () => {
		return isLoggedInWithPhantom() ? (
			<Typography style={{ fontSize: 14, marginLeft: 8 }}>
				{truncateWalletAddress(getLoggedInUser()?.solAddress)}
			</Typography>
		) : (
			<Typography style={{ fontSize: 14, marginLeft: 8 }}>
				LOGIN WITH PHANTOM
			</Typography>
		);
	};

	return ShownText();
};

export default PhantomButton;
