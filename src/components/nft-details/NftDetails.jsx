import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

import NftImage from "./NftImage";
import Details from "./Details";
import PropertiesSection from "./PropertiesSection";
import { createTheme, ThemeProvider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	rootContainer: {
		height: "100%",
		paddingTop: "6vh",
	},
	nftDetailsContainer: {
		display: "flex",
		justifyContent: "center",
		paddingBottom: "3vh",
	},
	nftImageContainer: {
		display: "flex",
		justifyContent: "flex-end",
	},
	detailsTabPanel: {
		marginTop: "6vh",
	},
	rarityContainer: {
		display: "flex",
		margin: "auto",
		backgroundColor: "#FAFAFA",
	},
}));

const defaultTheme = createTheme({
	palette: {
		background: {
			default: "#fff",
		},
		text: {
			primary: "#000",
		},
		primary: {
			main: "#000",
			contrastText: "#fff",
		},
	},
});

const NftDetails = (props) => {
	const classes = useStyles();

	const NftImageContainer = () => {
		return (
			<Grid item className={classes.nftImageContainer}>
				<NftImage nftJson={props.nftJson} />
			</Grid>
		);
	};

	const DetailsTabContainer = () => {
		return (
			<Grid item xs={4} className={classes.detailsTabPanel}>
				<Details nftJson={props.nftJson} />
			</Grid>
		);
	};

	const EmptyGrid = () => {
		return <Grid item lg={1} md={1} sm={1} xs={1} />;
	};

	const Properties = () => {
		return (
			<div className={classes.rarityContainer}>
				{props.nftJson.properties.length !== 0 && (
					<PropertiesSection {...props.nftJson} />
				)}
			</div>
		);
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<div className={classes.rootContainer}>
				<Grid container spacing={6} className={classes.nftDetailsContainer}>
					<EmptyGrid />
					<NftImageContainer />
					<DetailsTabContainer />
					<EmptyGrid />
				</Grid>
				<Properties />
			</div>
		</ThemeProvider>
	);
};

export default NftDetails;
