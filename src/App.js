import React, { useState, useEffect } from "react";
import Web3 from "web3";
import NftDetails from "./views/NftDetails";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
} from "react-router-dom";

import Home from "./views/Home";
import MintNft from "./views/MintNft";

import Profile from "./views/Profile";
import NavBar from "./components/common/Navbar";

import {
	fetchCollectionsOfUser,
	getAssetsAddedCollections,
} from "./api/opensea";

import "./App.css";
let web3;

function App() {
	const [account, setAccount] = useState(null); // Wallet Address
	const [balance, setBalance] = useState(null); // In Ether
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(async () => {
		updateUserData();
	}, [account, balance]);

	useEffect(async () => {
		if (!web3) await loadWeb3();

		if (account) {
			const newBalance = await fetchBalance();
			setBalance(web3.utils.fromWei(newBalance, "ether"));
		}
	}, [account]);

	const fetchBalance = async () => {
		const balance = await web3.eth.getBalance(account);

		return balance;
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
		<Router>
			<NavBar />
			<Switch>
				<Home
					exact
					path="/"
					loginWithMetamask={updateUserData}
					isLoggedIn={isLoggedIn}
				/>
				<MintNft path="/mint-nft" account={account} />
				<Profile path="/profile" account={account} />
			</Switch>
		</Router>
	);
}

export default App;
