import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import MetamaskButton from "./MetamaskButton";
import {
	getLoggedInUser,
	isUserLoggedIn,
	removeLoggedInUserFromLocalStorage,
} from "../../../utils/auth-utils";

const useStyles = makeStyles((theme) => ({
	navMenu: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		position: "relative",
		marginLeft: "auto",
		marginRight: 0,
	},
	menuLink: {
		marginLeft: "3vw",
		cursor: "pointer",
		textAlign: "center",
		color: theme.palette.text.primary,
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
		},
		letterSpacing: "1.5px",
		connectBtn: {},
	},
	logOutLink: {
		marginLeft: "3vw",
		cursor: "pointer",
		textAlign: "center",
		color: theme.palette.text.primary,
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
		},
		letterSpacing: "1.3px",
		marginRight: "3vw",
	},
}));

const Menu = ({ user }) => {
	const classes = useStyles();
	const [userLoggedIn, setUserLoggedIn] = useState(false);

	useEffect(() => {
		setUserLoggedIn(isUserLoggedIn());
		window.addEventListener("user-storage", () =>
			setUserLoggedIn(isUserLoggedIn())
		);

		return () => {
			window.removeEventListener("user-storage", () =>
				setUserLoggedIn(isUserLoggedIn())
			);
		};
	}, [userLoggedIn]);

	const menu = [
		{
			requiresLogin: true,
			component: (
				<Link className={classes.menuLink} to={"/mint-nft"}>
					<Typography variant="h4">Mint NFT</Typography>
				</Link>
			),
		},
		{
			requiresLogin: true,
			component: (
				<Link
					className={classes.menuLink}
					to={`/profile/${getLoggedInUser()?.id}`}
				>
					<Typography variant="h4">Profile</Typography>
				</Link>
			),
		},
		{
			requiresLogin: true,
			component: (
				<p
					className={classes.logOutLink}
					onClick={() => removeLoggedInUserFromLocalStorage()}
				>
					<Typography variant="h4"> Log out</Typography>
				</p>
			),
		},
	];

	return (
		<div className={classes.navMenu}>
			{menu
				.filter((item) => (item.requiresLogin ? userLoggedIn : true))
				.map((menuItem, i) => menuItem.component)}

			<MetamaskButton user={user} className={classes.connectBtn} />
		</div>
	);
};

export default Menu;
