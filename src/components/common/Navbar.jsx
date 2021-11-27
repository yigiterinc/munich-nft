import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import BrandLogo from "./nav/BrandLogo";
import Search from "./nav/Search";
import Menu from "./nav/Menu";


const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	navBar: {
		background: "white",
	},
}));

const Navbar = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.navBar}>
				<Toolbar>
					<BrandLogo />
					<Search />
					<Menu {...props}/>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
