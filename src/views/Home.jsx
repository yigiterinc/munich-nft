import React from "react";

import FeaturedCollection from "../components/home/FeaturedCollection";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "7vh 5vw",
	},
}));

function Home() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<FeaturedCollection />
		</div>
	);
}

export default Home;
