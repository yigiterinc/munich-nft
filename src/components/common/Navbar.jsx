import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import BrandLogo from "./nav/BrandLogo";
import SearchBar from "./SearchBar";
import Menu from "./nav/Menu";
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
					<BrandLogo />
					<div className={classes.searchBarContainer}>
						<SearchBar placeholder="Search galleries" options={options} />
					</div>
					<Menu {...props} />
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
