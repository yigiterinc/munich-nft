import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import logoImage from "../../../assets/images/dummy-logo.png";

const useStyles = makeStyles((theme) => ({
	logo: {
		display: "flex",
		alignItems: "center",
		textDecoration: "none",
		color: "#000",
	},
	title: {
		marginLeft: "17.5px",
	},
}));

const BrandLogo = () => {
	const classes = useStyles();
	return (
		<a className={classes.logo} href="">
			<img src={logoImage} alt="logo" />
			<h2 className={classes.title}>Dummy</h2>
		</a>
	);
};

export default BrandLogo;
