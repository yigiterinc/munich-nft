import React from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import MetamaskButton from "./MetamaskButton";
import { NavMobileMenu } from "./NavbarElements";

const MobileMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<Button
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				Menu
			</Button>
			<NavMobileMenu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem href="/market" onClick={handleClose}>
					Marketplace
				</MenuItem>
				<MenuItem href="/create" onClick={handleClose}>
					Create
				</MenuItem>
				<MenuItem href="/import" onClick={handleClose}>
					Import
				</MenuItem>
				<MenuItem href="/my-profile" onClick={handleClose}>
					My Profile
				</MenuItem>
				<MetamaskButton />
			</NavMobileMenu>
		</div>
	);
};

export default MobileMenu;
