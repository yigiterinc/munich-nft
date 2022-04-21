import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

import NftImage from "./NftImage";
import CustomTabs from "./CustomTabs";
import NftHeader from "./NftHeader";
import CollectionGroup from "./CollectionGroup";
import PriceField from "./PriceField";
import { createTheme, ThemeProvider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	nftDetailsContainer: {
		display: "flex",
		paddingTop: "5vh",
		width: "80vw",
		margin: "auto",
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
				<Grid item xs={6}>
					<NftImage nftJson={props.nftJson} />
				</Grid>
				<Grid item xs={6}>
					<NftHeader nftJson={props.nftJson} />
					{props.nftJson.blockchain === "Ethereum" && (
						<CollectionGroup nftJson={props.nftJson} />
					)}
					<PriceField nftJson={props.nftJson} />
					<CustomTabs nftJson={props.nftJson} />
				</Grid>
			</div>
		</ThemeProvider>
	);
};

export default NftDetails;
