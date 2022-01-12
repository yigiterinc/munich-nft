import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import MetamaskButton from "./MetamaskButton";
import {
	getLoggedInUser,
	isUserLoggedIn,
	removeLoggedInUserFromLocalStorage,
} from "../../../utils/auth-utils";

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
		marginLeft: "1.5vw",
		marginRight: "1.5vw",
		cursor: "pointer",
		textAlign: "center",
		color: "black",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
			color: "black",
		},
		fontSize: "18px",
		letterSpacing: "1.3px",
		fontWeight: "500",
		connectBtn: {},
	},
});

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
					Mint NFT
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
					Profile
				</Link>
			),
		},
		{
			requiresLogin: true,
			component: (
				<p
					className={classes.menuLink}
					onClick={() => removeLoggedInUserFromLocalStorage()}
				>
					Log out
				</p>
			),
		},
	];

	return (
		<div className={classes.navMenu}>
			{menu
				.filter((item) => (item.requiresLogin ? userLoggedIn : true))
				.map((menuItem, i) => (
					<div key={i}>{menuItem.component}</div>
				))}
			<MetamaskButton user={user} className={classes.connectBtn} />
		</div>
	);
};

export default Menu;
