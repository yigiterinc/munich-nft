import { useState, useEffect } from "react";
import Web3 from "web3";

import axios from "axios";

import { BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./views/Home";

let web3;
let seaport;

function App() {
	const [account, setAccount] = useState(null); // Wallet Address
	const [balance, setBalance] = useState(null); // In Ether
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(async () => {
		updateUserData();
	}, [account, balance]);

	useEffect(async () => {
		if (!web3) await loadWeb3();
		if (!seaport) await openSeaport();

		if (account) {
			const newBalance = await fetchBalance();
			setBalance(web3.utils.fromWei(newBalance, "ether"));
			fetchNfts(); // TODO this call should be made from somewhere else
		}
	}, [account]);

	const fetchBalance = async () => {
		const balance = await web3.eth.getBalance(account);

		return balance;
	};

	const openSeaport = () => {
		/* seaport = new OpenSeaPort(Web3.givenProvider, {
				networkName: Network.Main,
			}); */
	};

	const fetchNfts = async () => {
		let assetsObjects;
		try {
			assetsObjects = await axios.get(
				`https://rinkeby-api.opensea.io/api/v1/assets?owner=${account}&order_direction=desc&offset=0&limit=20`
			);
			assetsObjects = assetsObjects.data;
		} catch (e) {
			console.log("retrying", e);
			setTimeout(() => {
				this.refreshData();
			}, 1500);
			return;
		}
		console.log(assetsObjects);
	};

	const updateUserData = async () => {
		await loadWeb3();
		await loadAccount();

		if (account && balance) {
			setIsLoggedIn(true);
		}
	};

	const loadWeb3 = async () => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			window.alert("Non-ethereum browser detected. Try using MetaMask!");
		}

		web3 = window.web3;
	};

	const loadAccount = async () => {
		// Returns the list of accounts that metamask is aware of
		const accounts = await web3.eth.getAccounts();
		setAccount(accounts[0]);
	};

	return (
		<Router path="/">
			<Switch>
				<Home loginWithMetamask={updateUserData} isLoggedIn={isLoggedIn} />
			</Switch>
		</Router>
	);
}

export default App;
