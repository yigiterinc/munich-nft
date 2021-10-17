import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MetamaskButton from "./MetamaskButton";

const useStyles = makeStyles((theme) => ({
	navMenu: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		position: "relative",
	},
	menuLink: {
		padding: "1rem 2rem",
		cursor: "pointer",
		textAlign: "center",
		textDecoration: "none",
		color: "#000",
		fontSize: "0.85rem",
	},
}));

const Menu = () => {
	const classes = useStyles();
	return (
		<div className={classes.navMenu}>
			<a className={classes.menuLink} href="/market">
				Marketplace
			</a>
			<a className={classes.menuLink} href="/create">
				Create
			</a>
			<a className={classes.menuLink} href="/import">
				Import
			</a>
			<a className={classes.menuLink} href="/my-profile">
				My Profile
			</a>
			<MetamaskButton />
		</div>
	);
};

export default Menu;
