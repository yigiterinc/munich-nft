import React from "react";
import MetamaskButton from "./MetamaskButton";
import { NavMenu, MenuLink } from "./NavbarElements";

const Menu = () => {
	return (
		<NavMenu>
			<MenuLink href="/market">Marketplace</MenuLink>
			<MenuLink href="/create">Create</MenuLink>
			<MenuLink href="/import">Import</MenuLink>
			<MenuLink href="/my-profile">My Profile</MenuLink>
			<MetamaskButton />
		</NavMenu>
	);
};

export default Menu;
