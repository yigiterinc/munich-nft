import React from "react";
import { Logo, Title } from "./NavbarElements";
import logoImage from "../../../assets/images/dummy-logo.png";

const BrandLogo = () => {
	return (
		<Logo href="">
			<img src={logoImage} alt="logo" />
			<Title class="nav-title">Dummy</Title>
		</Logo>
	);
};

export default BrandLogo;
