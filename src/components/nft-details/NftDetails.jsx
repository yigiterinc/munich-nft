import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

import NftImage from "./NftImage";
import NftHeader from "./NftHeader";
import CollectionGroup from "./CollectionGroup";
import DetailsSection from "./DetailsSection";
import DescriptionSection from "./DescriptionSection";
import PropertiesSection from "./PropertiesSection";
import { createTheme, ThemeProvider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	nftDetailsContainer: {
		display: "flex",
		paddingTop: "8vh",
		margin: "0 auto",
		paddingBottom: "4vh",
	},
	rarityContainer: {
		display: "flex",
		margin: "auto",
		backgroundColor: "#FAFAFA",
	},
	detailsTabPanel: {
		paddingTop: "8vh",
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
	return (
		<ThemeProvider theme={defaultTheme}>
			<div className={classes.nftDetailsContainer}>
				<Grid container>
					<Grid xs={2} />
					<Grid item xs={4}>
						<NftImage nftJson={props.nftJson} />
					</Grid>
					<Grid item xs={4} className={classes.detailsTabPanel}>
						<NftHeader nftJson={props.nftJson} />
						{props.nftJson.blockchain === "Ethereum" && (
							<>
								<CollectionGroup nftJson={props.nftJson} />
								<DetailsSection {...props.nftJson} />
								{/* <DescriptionSection {...props.nftJson} /> */}
							</>
						)}
					</Grid>
					<Grid xs={2} />
				</Grid>
			</div>
			<div className={classes.rarityContainer}>
				{props.nftJson.properties.length !== 0 && (
					<PropertiesSection {...props.nftJson} />
				)}
			</div>
		</ThemeProvider>
	);
};

export default NftDetails;
