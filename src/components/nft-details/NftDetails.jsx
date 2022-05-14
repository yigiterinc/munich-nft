import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

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

	const DetailsTabContainer = () => {
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
				<Grid
					justifyContent="flex-start"
					className={classes.properties}
					container
					xs
				>
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

	const Stats = () => {
		return (
			<Grid container>
				<EmptyGrid />
				<Grid
					justifyContent="flex-start"
					container
					xs
					className={classes.statsContainer}
				>
					<div className={classes.sectionText}>
						<Typography>
							Market statistics for the{" "}
							<Link
								className={classes.collectionLink}
								to={`/collection/${props.nftJson.slug}`}
							>
								{props.nftJson.collection}
							</Link>
						</Typography>
						<Typography classsName={classes.innerText}>
							* Statistics are generated from the NFT activity on Opensea
							platform
						</Typography>
					</div>
					<StatsSection {...props.nftJson} />
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
					<DetailsTabContainer />
					<EmptyGrid />
				</Grid>
				<div className={classes.sectionsContainer}>
					<Properties />

					<Grid container className={classes.sectionContainer}>
						{props.nftJson.stats.length !== 0 && <Stats />}
					</Grid>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default NftDetails;
