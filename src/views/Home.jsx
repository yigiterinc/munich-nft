import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Intro from "../components/home/Intro";
import FeaturedCollection from "../components/home/FeaturedCollection";
import TopGalleries from "../components/home/TopGalleries";
import TopNFTs from "../components/home/TopNFTs";
import HowItWorks from "../components/home/HowItWorks";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "7vh 5vw",
	},
	topGalleries: {
		marginTop: "5vh",
	},
	howItWorks: {
		marginTop: "3vh",
	},
}));

function Home() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={5}>
				<Grid item xs={6}>
					<Intro />
					<TopNFTs />
				</Grid>
				<Grid item xs={6}>
					<FeaturedCollection />
				</Grid>
				<Grid item xs={12} className={classes.topGalleries}>
					<TopGalleries />
				</Grid>
				<Grid item xs={12} className={classes.howItWorks}>
					<HowItWorks />
				</Grid>
			</Grid>
		</div>
	);
}

export default Home;