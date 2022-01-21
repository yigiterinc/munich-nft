import React, { useEffect, useState } from "react";
import Web3 from "web3";

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";

import Home from "./views/Home";
import Navbar from "./components/common/Navbar";

import MintNft from "./views/MintNft";
import Collection from "./views/Collection";
import Profile from "./views/Profile";
import ProfileSettings from "./views/ProfileSettings";
import GalleryContainer from "./views/GalleryContainer";

import "./App.css";
import CreateGallery from "./views/CreateGallery";
import NftDetails from "./views/NftDetails";
import { isUserLoggedIn } from "./utils/auth-utils";

let web3;

function App() {
	useEffect(async () => {
		if (!web3) await loadWeb3();
	}, []);

	const loadWeb3 = async () => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		}

		web3 = window.web3;
	};

	function ProtectedRoute({ component: Component, ...restOfProps }) {
		return (
			<Route
				{...restOfProps}
				render={(props) =>
					isUserLoggedIn() ? <Component {...props} /> : <Redirect to="/" />
				}
			/>
		);
	}

	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<ProtectedRoute path="/mint-nft" component={MintNft} />
				<ProtectedRoute path="/gallery/:slug" component={GalleryContainer} />
				<Route path="/collection/:slug" component={Collection} />
				<ProtectedRoute path="/profile-settings" component={ProfileSettings} />
				<Route
					path="/token/:contractAddressId/:tokenId"
					component={NftDetails}
				/>
				<ProtectedRoute path="/profile/:userId" component={Profile} />
				<ProtectedRoute path="/create-gallery" component={CreateGallery} />
			</Switch>
		</Router>
	);
}

export default App;
