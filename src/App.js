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
import EthNftDetails from "./views/EthNftDetails";
import SolNftDetails from "./views/SolNftDetails";
import { isUserLoggedIn } from "./utils/auth-utils";

import "@fontsource/quicksand";

import "@fontsource/quicksand/300.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";

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
			<Navbar/>
			<Switch>
				<Route exact path="/" component={Home} />
				<ProtectedRoute path="/mint-nft" component={MintNft} />
				<Route path="/gallery/:slug" component={GalleryContainer} />
				<Route path="/collection/:slug" component={Collection} />
				<ProtectedRoute path="/profile-settings" component={ProfileSettings} />
				<Route
					path="/eth-token/:contractAddressId/:tokenId"
					component={EthNftDetails}
				/>
				<Route path="/sol-token/:mintAddress" component={SolNftDetails} />
				<ProtectedRoute path="/profile/:userId" component={Profile} />
				<ProtectedRoute path="/create-gallery" component={CreateGallery} />
			</Switch>
		</Router>
	);
}

export default App;
