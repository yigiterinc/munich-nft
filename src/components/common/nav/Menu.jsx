import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

import MetamaskButton from "./MetamaskButton";

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

const Menu = () => {
	const classes = useStyles();
	const menuLinks = ["market", "create", "import", "profile"];
	return (
		<div className={classes.navMenu}>
			{menuLinks.map((link) => {
				return (
					<Link className={classes.menuLink} to={"/".concat(link)}>
						{link.charAt(0).toUpperCase() + link.slice(1)}
					</Link>
				);
			})}
			<MetamaskButton className={classes.connectBtn} />
		</div>
	);
};

export default Menu;
