import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";

import NftImage from "./NftImage";
import Details from "./Details";
import PropertiesSection from "./PropertiesSection";
import StatsSection from "./StatsSection";

import { createTheme, ThemeProvider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	rootContainer: {
		height: "100%",
		paddingTop: "6vh",
	},
	nftDetailsContainer: {
		display: "flex",
		justifyContent: "center",
		marginBottom: "4vh",
	},
	nftImageContainer: {
		display: "flex",
		justifyContent: "flex-end",
	},
	detailsTabPanel: {
		marginTop: "6vh",
	},
	sectionsContainer: {
		backgroundColor: "#FAFAFA",
	},
	sectionContainer: {
		marginBottom: "4vh",
	},
	sectionText: {
		marginTop: "2.5vh",
	},
	statsContainer: {
		border: "1px solid rgb(225, 225, 225)",
		borderRadius: "10px",
		marginBottom: "40px",
		display: "flex",
		flexFlow: "row wrap",
		width: "100%",
	},
	statItem: {
		borderBottom: "1px solid rgb(225, 225, 225)",
		borderRight: "1px solid rgb(225, 225, 225)",
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

	const EmptyGrid = () => {
		return <Grid item lg={1} md={1} sm={1} xs={1} />;
	};

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

	const Properties = () => {
		return (
			<Grid container className={classes.sectionContainer}>
				<Grid item lg={2} md={2} sm={2} xs={2} />
				<Grid
					container
					spacing={2}
					justifyContent="flex-start"
					className={classes.properties}
					xs={8}
				>
					<Typography className={classes.sectionText}>
						Traits for <b>{`${props.nftJson.name}`}</b>
					</Typography>
					{props.nftJson.properties.length !== 0 && (
						<PropertiesSection {...props.nftJson} />
					)}
				</Grid>
				<Grid item lg={2} md={2} sm={2} xs={2} />
			</Grid>
		);
	};

	const Stats = () => {
		return (
			<div className={classes.statsContainer}>
				{props.nftJson.properties.length !== 0 && (
					<StatsSection {...props.nftJson} />
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
				<div className={classes.sectionsContainer}>
					<Properties />
					<Grid container className={classes.statsContainer}>
						<Stats />
					</Grid>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default NftDetails;
