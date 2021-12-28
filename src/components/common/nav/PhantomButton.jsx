import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

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
		window.solana.on("connect", () => {
			setConnectedWithPhantom(true);
		});

		window.solana.on("disconnect", () => {
			setConnectedWithPhantom(false);
		});
	}, [phantom]);

	const connect = async () => {
		getProvider();
		try {
			const connection = window.solana.connect();
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

		window.open("https://phantom.app/", "_blank");
	};

	const ShownButton = () => {
		return connectedWithPhantom ?
			<Button onClick={() => disconnect()}>Disconnect</Button>
			:
			<Button onClick={() => connect()}>Login with Phantom</Button>;
	};

	return (
		ShownButton()
	);
};

export default PhantomButton;