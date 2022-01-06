import React, { useEffect, useState } from "react";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import {
	getLoggedInUser,
	isUserLoggedIn,
	logout,
} from "../../../utils/auth-utils";
import { MeetingRoomTwoTone } from "@material-ui/icons";

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
		marginRight: "1.5vw",
		marginLeft: "4px",
		cursor: "pointer",
		color: "black",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
			color: "black",
		},
		fontSize: "18px",
		letterSpacing: "1.3px",
		fontWeight: "500",
	},
	flex: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
});

const NavbarItems = () => {
	const classes = useStyles();
	const [userLoggedIn, setUserLoggedIn] = useState(false);

	useEffect(() => {
		setUserLoggedIn(isUserLoggedIn());
		window.addEventListener("user-storage", () =>
			setUserLoggedIn(isUserLoggedIn()),
		);

		return () => {
			window.removeEventListener("user-storage", () =>
				setUserLoggedIn(isUserLoggedIn()),
			);
		};
	}, [userLoggedIn]);

	const menu = [
		{
			requiresLogin: true,
			component: (
				<div className={classes.flex}>
					<AddCircleOutlineTwoToneIcon size={30} style={{ fill: "black" }} />
					<Link className={classes.menuLink} to={"/mint-nft"}>
						Mint NFT
					</Link>
				</div>
			),
		},
		{
			requiresLogin: true,
			component: (
				<div className={classes.flex}>
					<AccountCircleTwoToneIcon size={30} style={{ fill: "black" }} />
					<Link
						className={classes.menuLink}
						to={`/profile/${getLoggedInUser()?.id}`}
					>
						Profile
					</Link>
				</div>
			),
		},
		{
			requiresLogin: true,
			component: (
				<div className={classes.flex}>
					<MeetingRoomTwoTone size={30} style={{ fill: "black" }} />
					<p
						className={classes.menuLink}
						onClick={() => logout()}
					>
						Log out
					</p>
				</div>
			),
		},
	];

	return (
		<div className={classes.navMenu}>
			{menu
				.filter((item) => (item.requiresLogin ? userLoggedIn : true))
				.map((menuItem, i) => menuItem.component)}
		</div>
	);
};

export default NavbarItems;
