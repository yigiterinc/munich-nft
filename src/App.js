import { useState, useEffect } from "react";
import Web3 from "web3";

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
		setLoggedInUser(await createOrFetchUser(
			{ username: 'Alien', walletAddress: walletAddress }));
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
			<NavBar />
			<Switch>
				<Home
					exact path="/"
					account={walletAddress}
					loginWithMetamask={updateUserData}
				/>
				<MintNft path="/mint-nft" account={walletAddress} user={loggedInUser} />
				<Profile path="/profile" account={walletAddress} user={loggedInUser} />
			</Switch>
		</Router>
	);
}

export default App;
