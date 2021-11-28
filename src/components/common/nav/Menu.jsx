import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import MetamaskButton from "./MetamaskButton";

const useStyles = makeStyles({
	navMenu: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		position: "relative",
		marginLeft: "auto",
		marginRight: 0,
	},
	menuLink: {
		marginRight: "25px",
		cursor: "pointer",
		textAlign: "center",
		color: "#000",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
		},
		fontSize: "18px",
		letterSpacing: "1.3px",
		fontWeight: "500",
		connectBtn: {},
	},
});

const Menu = ({ user, onWalletConnection }) => {
	const classes = useStyles();
	const menu = [
		{
			label: "Mint NFT",
			getRoute: () => "/mint-nft"
		},
		{
			label: "Profile",
			getRoute: () => {
				return `/profile/${user ? user.id : ''}`
			}
		},
	]

	return (
		<div className={classes.navMenu}>
			{menu
				.filter(item => item.label !== "Profile" || user)
				.map(((menuItem, i) => {
				return (
					<Link key={i} className={classes.menuLink} to={menuItem.getRoute()}>
						{menuItem.label}
					</Link>
				);
			}))}
			<MetamaskButton
				onWalletConnection={onWalletConnection}
				user={user}
				className={classes.connectBtn}
			/>
		</div>
	);
};

export default Menu;
