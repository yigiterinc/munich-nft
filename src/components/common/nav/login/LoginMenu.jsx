import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AccountBalanceWalletTwoToneIcon from "@material-ui/icons/AccountBalanceWalletTwoTone";
import MetamaskButton from "./MetamaskButton";
import PhantomButton from "./PhantomButton";
import { IoMdWallet } from "react-icons/io";
import { Menu, MenuItem } from "@material-ui/core";
import metamaskLogo from "../../../../assets/images/metamask.png";
import phantomLogo from "../../../../assets/images/phantom.png";

const LoginMenu = (props) => {
	const [anchorElement, setAnchorElement] = useState(null);

	const handleClick = (event) => {
		setAnchorElement(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorElement(null);
	};

	return (
		<div>
			<Button aria-controls="simple-menu" aria-haspopup="true">
				<AccountBalanceWalletTwoToneIcon onClick={handleClick} size={30} />
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorElement}
				keepMounted
				open={Boolean(anchorElement)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>
					<div style={{ display: "flex", alignItems: "center", height: "30px" }}>
						<img src={metamaskLogo} alt="metamask-logo"
								 style={{ height: "20px", width: "20px", display: "inline", marginRight: "5px" }} />
						<MetamaskButton />
					</div>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<div style={{ display: "flex", alignItems: "center", height: "30px" }}>
						<img src={phantomLogo} alt="phantom-logo"
								 style={{ height: "20px", width: "20px", display: "inline", marginRight: "5px" }} />
						<PhantomButton />
					</div>
				</MenuItem>
			</Menu>
		</div>
	);

};

export default LoginMenu;