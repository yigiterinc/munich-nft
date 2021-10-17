import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import BrandLogo from "./nav/BrandLogo";
import Search from "./nav/Search";
import Menu from "./nav/Menu";
import MobileMenu from "./nav/MobileMenu";

const useStyles = makeStyles((theme) => ({
	navBar: {
		padding: "0 2rem",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
		background: "white",
		heigth: "72px",
		boxShadow: "rgb(4 17 29 / 25%) 0px 0px 8px 0px",
	},
}));

const Navbar = () => {
	const { width } = useCurrentWidthOfTheScreen();
	const classes = useStyles();

	return (
		<>
			<nav className={classes.navBar}>
				<BrandLogo />
				{width > 780 ? <Search /> : <div />}
				{width > 1408 ? <Menu /> : <MobileMenu />}
			</nav>
		</>
	);
};

function useCurrentWidthOfTheScreen() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

function getWindowDimensions() {
	const { innerWidth: width } = window;
	return {
		width,
	};
}

export default Navbar;
