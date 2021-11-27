import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom"

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
		padding: "1rem 2.5rem",
		cursor: "pointer",
		textAlign: "center",
		color: "#000",
		fontSize: "0.95rem",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
		},
		connectBtn: {},
	},
}));

const Menu = ({ user, onWalletConnection }) => {
	const classes = useStyles();
	const menu = [
		{
			label: "Marketplace",
			getRoute: () => "/market"
		},
		{
			label: "Create",
			getRoute: () => "/mint-nft"
		},
		{
			label: "Profile",
			getRoute: () => {
				return `/profile/${user ? user.id : ''}`
			}
		}
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
			<MetamaskButton onWalletConnection={onWalletConnection} className={classes.connectBtn} />
		</div>
	);
};

export default Menu;
