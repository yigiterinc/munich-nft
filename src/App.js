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
import Navbar from "./components/common/Navbar";

import MintNft from "./views/MintNft";
import Collection from "./views/Collection";
import Profile from "./views/Profile";
import { createOrFetchUser } from "./api/strapi";

import "./App.css";
import CreateGallery from "./views/CreateGallery";

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
				walletAddress
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
			<Navbar user={loggedInUser} onWalletConnection={setWalletAddress} />
			<Switch>
				<Route exact path="/">
					<Home exact path="/" account={walletAddress} />
				</Route>
				<Route path="/mint-nft">
					<MintNft account={walletAddress} user={loggedInUser} />
				</Route>
				<Route path="/collection/:slug">
					<Collection account={walletAddress} user={loggedInUser} />
				</Route>
				<Route
					path="/profile/:userId"
					render={(props) =>
						// TODO even if the user is not logged in they should be able to see other people's profiles, not currently possible
						!loggedInUser ? <Redirect to="/" /> : <Profile {...props} />
					}
				>
					<Profile account={walletAddress} user={loggedInUser} />
				</Route>
				<Route path="/create-gallery" render={(props) => {
					return !loggedInUser ? <Redirect to="/" /> : <CreateGallery {...props}/>
				}}>
					<CreateGallery user={loggedInUser} account={walletAddress}/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
