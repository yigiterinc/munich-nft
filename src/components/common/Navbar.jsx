import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Logo from "./nav/Logo";
import AutocompleteSearchBar from "./AutocompleteSearchBar";
import NavbarItems from "./nav/NavbarItems";
import LoginMenu from "./nav/login/LoginMenu";
import { fetchGalleries } from "../../api/strapi";

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
	const [options, setOptions] = useState();
	const classes = useStyles();

	useEffect(async () => {
		const galleries = await fetchGalleries();
		setOptions(
			galleries.map((gallery) => {
				return {
					name: gallery.galleryName,
					slug: gallery.slug,
				};
			})
		);
	}, []);

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.navbar}>
				<Toolbar>
					<Logo />
					<div className={classes.searchBarContainer}>
						<AutocompleteSearchBar
							placeholder="Search galleries"
							options={options}
						/>
					</div>
					<NavbarItems {...props} />
					<LoginMenu />
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
