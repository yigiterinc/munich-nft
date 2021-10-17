import React, { useEffect, useState } from "react";
import { Nav } from "./nav/NavbarElements";

import BrandLogo from "./nav/BrandLogo";
import Search from "./nav/Search";
import Menu from "./nav/Menu";
import MobileMenu from "./nav/MobileMenu";

const Navbar = () => {
	const { width } = useCurrentWidthOfTheScreen();
	return (
		<>
			<Nav>
				<BrandLogo />
				{width > 780 ? <Search /> : <div />}
				{width > 1408 ? <Menu /> : <MobileMenu />}
			</Nav>
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
