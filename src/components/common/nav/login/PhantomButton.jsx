import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import {
	getLoggedInUser,
	isLoggedInWithPhantom,
	loginWithPhantom,
} from "../../../../utils/auth-utils";
import { truncateWalletAddress } from "../../../../utils/commons";

const PhantomButton = () => {

	useEffect(() => {
		if (!("solana" in window)) {
			return;
		}

		window.solana.on("connect", async () => {
			await loginWithPhantom();
		});
	}, []);

	const connectWithSolana = async () => {
		try {
			const connection = await window.solana.connect();
		} catch (err) {
			// user rejected the login request
		}
	};

	const ShownButton = () => {
		return isLoggedInWithPhantom() ?
			<Button disabled>{truncateWalletAddress(getLoggedInUser()?.solAddress)}</Button>
			:
			<Button onClick={() => connectWithSolana()}>Login with Phantom</Button>;
	};

	return (
		ShownButton()
	);
};

export default PhantomButton;