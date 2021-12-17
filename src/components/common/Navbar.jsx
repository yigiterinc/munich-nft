import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import BrandLogo from "./nav/BrandLogo";
import SearchBar from "./SearchBar";
import Menu from "./nav/Menu";
import { COLORS } from "../../theme/variables";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	navbar: {
		background: COLORS.navBar,
	},
	searchBarContainer: {
		width: "400px",
	},
}));

const Navbar = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.navbar}>
				<Toolbar>
					<BrandLogo />
					<div className={classes.searchBarContainer}>
						<SearchBar placeholder="Search items, collections and accounts" />
					</div>
					<Menu {...props} />
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
