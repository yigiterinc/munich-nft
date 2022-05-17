import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import AccountBalanceWalletTwoToneIcon from "@material-ui/icons/AccountBalanceWalletTwoTone";
import MetamaskButton from "./MetamaskButton";
import PhantomButton from "./PhantomButton";
import { Menu, MenuItem } from "@material-ui/core";
import metamaskLogo from "../../../../assets/images/metamask.png";
import phantomLogo from "../../../../assets/images/phantom.png";
import {
	loginWithMetamask,
	isLoggedInWithMetamask, isUserLoggedIn
} from "../../../../utils/auth-utils";
import {
	loginWithPhantom,
	isLoggedInWithPhantom,
} from "../../../../utils/auth-utils";

const LoginMenu = (props) => {
	const [anchorElement, setAnchorElement] = useState(null);

	useEffect(() => {
		if (!("solana" in window)) {
			return;
		}

		window.solana.on("connect", async () => {
			await loginWithPhantom();
		});
	}, []);

	const connectWithSolana = async () => {
		try {
			const connection = await window.solana.connect();
		} catch (err) {
			// user rejected the login request
		}
	};

	const handleClick = (event) => {
		setAnchorElement(event.currentTarget);
	};

	const handleLoginWithMetamask = () => {
		loginWithMetamask();
		setAnchorElement(null);
	};

	const handleLoginWithPhantom = () => {
		connectWithSolana();
		setAnchorElement(null);
	};

	const handleClose = () => {
		setAnchorElement(null);
	};

	return (
		<div style={!props.userLoggedIn ? { marginLeft: "auto"} : {}}>
			<Button
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<AccountBalanceWalletTwoToneIcon size={30} />
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorElement}
				keepMounted
				open={Boolean(anchorElement)}
				onClose={handleClose}
			>
				<MenuItem
					disabled={isLoggedInWithMetamask()}
					onClick={handleLoginWithMetamask}
				>
					<div
						style={{ display: "flex", alignItems: "center", height: "30px" }}
					>
						<img
							src={metamaskLogo}
							alt="metamask-logo"
							style={{
								height: "20px",
								width: "20px",
								display: "inline",
								marginRight: "5px",
							}}
						/>
						<MetamaskButton />
					</div>
				</MenuItem>
				<MenuItem
					disabled={isLoggedInWithPhantom()}
					onClick={handleLoginWithPhantom}
				>
					<div
						style={{ display: "flex", alignItems: "center", height: "30px" }}
					>
						<img
							src={phantomLogo}
							alt="phantom-logo"
							style={{
								height: "20px",
								width: "20px",
								display: "inline",
								marginRight: "5px",
							}}
						/>
						<PhantomButton />
					</div>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default LoginMenu;
