import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { createOrFetchUserOnLoginWithPhantom, updateUser } from "../../../../api/strapi";
import {
	getLoggedInUser,
	isUserLoggedIn,
	isLoggedInWithPhantom,
	saveLoggedInUserToLocalStorage,
} from "../../../../utils/auth-utils";
import { truncateWalletAddress } from "../../../../utils/commons";

const PhantomButton = () => {
	const [phantom, setPhantom] = useState(null);
	const [connectedWithPhantom, setConnectedWithPhantom] = useState(false);

	useEffect(() => {
		const provider = getProvider();
		if (provider) {
			setPhantom(provider);
		}
	}, []);

	useEffect(() => {
		if (!("solana" in window)) {
			return;
		}

		window.solana.on("connect", async () => {
			await onConnected();
		});

		window.solana.on("disconnect", () => {
			setConnectedWithPhantom(false);
		});
	}, [phantom]);

	const onConnected = async () => {
		setConnectedWithPhantom(true);

		const handleAlreadyLoggedInUser = async () => {
			let user = getLoggedInUser();
			user.solAddress = window.solana.publicKey.toString();

			if (user.connectedWallets) {
				user.connectedWallets = { ...user.connectedWallets, phantom: true };
			} else {
				user.connectedWallets = { phantom: true };
			}

			await updateUser(user);

			saveLoggedInUserToLocalStorage(user);
		};

		if (isUserLoggedIn()) {
			await handleAlreadyLoggedInUser();
			return;
		}

		const user = await createOrFetchUserOnLoginWithPhantom({
			solAddress: window.solana.publicKey.toString(),
		});

		if (!user) {
			console.log("error while creating or fetching user");
			return;
		}

		if (user.connectedWallets) {
			user.connectedWallets = { ...user.connectedWallets, metamask: true };
		} else {
			user.connectedWallets = { phantom: true };
		}

		saveLoggedInUserToLocalStorage(user);
	};

	const loginWithPhantom = async () => {
		getProvider();
		try {
			const connection = await window.solana.connect();
			console.log(connection);
			await onConnected();
		} catch (err) {
			// user rejected the login request
		}
	};

	const getProvider = () => {
		if ("solana" in window) {
			const provider = window.solana;
			if (provider.isPhantom) {
				return provider;
			}
		}
	};

	const ShownButton = () => {
		return isLoggedInWithPhantom() ?
			<Button disabled>{truncateWalletAddress(getLoggedInUser()?.solAddress)}</Button>
			:
			<Button onClick={() => loginWithPhantom()}>Login with Phantom</Button>;
	};

	return (
		ShownButton()
	);
};

export default PhantomButton;