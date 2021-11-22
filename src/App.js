import React, { useState, useEffect } from "react";
import Web3 from "web3";
import NftDetails from "./views/NftDetails";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	Redirect,
} from "react-router-dom";

import Home from "./views/Home";
import MintNft from "./views/MintNft";

import Profile from "./views/Profile";
import Market from "./views/Market";
import NavBar from "./components/common/Navbar";
import { createOrFetchUser } from "./api/strapi";

import "./App.css";

let web3;

function App() {
	const [walletAddress, setWalletAddress] = useState("");
	const [loggedInUser, setLoggedInUser] = useState(null); // Wallet Address

	useEffect(async () => {
		await updateUserData();
	}, [walletAddress]);

	useEffect(async () => {
		if (!web3) await loadWeb3();
	}, [loggedInUser]);

	const updateUserData = async () => {
		await loadWeb3();
		await loadAccount();
		setLoggedInUser(
			await createOrFetchUser({
				username: "Alien",
				walletAddress: walletAddress,
			})
		);
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
		setWalletAddress(accounts[0].toLowerCase());
	};

	return (
		<Router>
			<NavBar user={loggedInUser} onWalletConnection={setWalletAddress} />
			<Switch>
				<Route exact path="/">
					<Home exact path="/" account={walletAddress} />
				</Route>
				<Route path="/market">
					<Market />
				</Route>
				<Route path="/mint-nft">
					<MintNft account={walletAddress} user={loggedInUser} />
				</Route>
				<Route
					path="/profile/:userId"
					render={(props) =>
						!loggedInUser ? <Redirect to="/" /> : <Profile {...props} />
					}
				>
					<Profile account={walletAddress} user={loggedInUser} />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
