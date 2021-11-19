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
});

const Menu = (user) => {
	const classes = useStyles();
	const menu = [
		{
			label: "Marketplace",
			route: "/market"
		},
		{
			label: "Create",
			route: "/mint-nft"
		},
		{
			label: "Profile",
			route: "/profile/" + user.id
		}
	]

	return (
		<div className={classes.navMenu}>
			{menu.map(((menuItem, i) => {
				return (
					<Link key={i} className={classes.menuLink} to={menuItem.route}>
						{menuItem.label}
					</Link>
				);
			}))}
			<MetamaskButton className={classes.connectBtn} />
		</div>
	);
};

export default Menu;
