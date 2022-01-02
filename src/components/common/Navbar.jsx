import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Logo from "./nav/Logo";
import SearchBar from "./SearchBar";
import NavbarItems from "./nav/NavbarItems";
import LoginMenu from "./nav/login/LoginMenu";

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	navbar: {
		background: "white",
	},
	searchBarContainer: {
		width: "400px",
	},
});

const Navbar = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.navbar}>
				<Toolbar>
					<Logo />
					<div className={classes.searchBarContainer}>
						<SearchBar placeholder="Search items, collections and accounts" />
					</div>
					<NavbarItems {...props} />
					<LoginMenu />
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
