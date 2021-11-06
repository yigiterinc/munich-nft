import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import logoImage from "../../../assets/images/dummy-logo.png";

const useStyles = makeStyles({
	logoContainer: {
		width: "auto",
		marginRight: 80,
	},
	logo: {
		display: "flex",
		alignItems: "center",
		color: "#000",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
		},
	},
	title: {
		paddingLeft: "20px",
	},
});

const BrandLogo = () => {
	const classes = useStyles();
	return (
		<div className={classes.logoContainer}>
			<Link className={classes.logo} href="">
				<img src={logoImage} alt="logo" />
				<Typography className={classes.title}>Dummy</Typography>
			</Link>
		</div>
	);
};

export default BrandLogo;
