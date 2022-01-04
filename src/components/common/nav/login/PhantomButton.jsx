import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { createOrFetchUserOnLoginWithPhantom } from "../../../../api/strapi";
import { saveLoggedInUserToLocalStorage } from "../../../../utils/auth-utils";

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
		const user = await createOrFetchUserOnLoginWithPhantom({
			solAddress: window.solana.publicKey.toString(),
		});

		if (user.connectedWallets) {
			user.connectedWallets = { ...user.connectedWallets, metamask: true };
		} else {
			user.connectedWallets = { phantom: true };
		}

		if (!user) {
			console.log("error while creating or fetching user");
			return;
		}

		saveLoggedInUserToLocalStorage(user);
	};

	const loginWithPhantom = async () => {
		getProvider();
		try {
			const connection = await window.solana.connect();
			console.log(connection);
		} catch (err) {
			// user rejected the login request
		}
	};

	const disconnect = () => {
		window.solana.disconnect();
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
		return connectedWithPhantom ?
			<Button onClick={() => disconnect()}>Disconnect</Button>
			:
			<Button onClick={() => loginWithPhantom()}>Login with Phantom</Button>;
	};

	return (
		ShownButton()
	);
};

export default PhantomButton;