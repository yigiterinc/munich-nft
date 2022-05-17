import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";

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
		marginBottom: "4vh",
	},
	nftImageContainer: {
		display: "flex",
		justifyContent: "flex-end",
	},
	detailsTabPanel: {
		marginTop: "7.5vh",
	},
	sectionsContainer: {
		backgroundColor: "#FAFAFA",
		height: "650px",
	},
	sectionContainer: {
		height: "240px",
		marginTop: "6.5vh",
		marginBottom: "4vh",
	},
	propertiesContainer: {
		paddingTop: "3vh",
	},
	collectionLink: {
		fontSize: "16px",
		color: "#000",
		cursor: "pointer",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "underline",
		},
	},
	sectionText: {
		marginBottom: "1vh",
		justifyContent: "center",
		paddingTop: "12px",
		fontSize: "16px",
		height: "40px",
		color: "rgb(88, 106, 109)",
	},
	innerText: {
		fontWeight: 200,
		fontSize: "12px",
	},
	statsContainer: {
		display: "flex",
		flexDirection: "column",
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

	const DetailsContainer = () => {
		return (
			<Grid item xs={4} className={classes.detailsTabPanel}>
				<Details nftJson={props.nftJson} />
			</Grid>
		);
	};

	const Properties = () => {
		return (
			<Grid container className={classes.propertiesContainer}>
				<EmptyGrid />
				<Grid item className={classes.properties} xs>
					<div className={classes.sectionText}>
						<Typography>
							Traits for <b>{`${props.nftJson.name}`}</b>
						</Typography>
					</div>
					<PropertiesSection {...props.nftJson} />
				</Grid>
				<EmptyGrid />
			</Grid>
		);
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<div className={classes.rootContainer}>
				<Grid container spacing={6} className={classes.nftDetailsContainer}>
					<EmptyGrid />
					<NftImageContainer />
					<DetailsContainer />
					<EmptyGrid />
				</Grid>
				<div className={classes.sectionsContainer}>
					<Properties />
				</div>
			</div>
		</ThemeProvider>
	);
};

export default NftDetails;
