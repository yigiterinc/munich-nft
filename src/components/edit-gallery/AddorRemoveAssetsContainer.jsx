import React, { useState } from "react";

import { Select, MenuItem, Typography, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { darken, makeStyles } from "@material-ui/core/styles";
import ImportFromOpensea from "../create-gallery/ImportFromOpensea";
import ImportFromContract from "../create-gallery/ImportFromContract";
import ImportFromPhantomWallet from "../create-gallery/ImportFromPhantomWallet";
import TextField from "@material-ui/core/TextField";
import RemoveAssets from "./RemoveAssets";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		paddingLeft: "2vw",
		paddingRight: "2vw",
	},
	gridItem: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	selectMethodText: {
		fontSize: "20px",
		letterSpacing: "1.5",
		lineHeight: "120%",
	},
	textField: {
		marginTop: 20,
		width: "20vw",
	},
	nextButton: {
		background: "#b35bff",
		color: "#FFFFFF",
		"&:hover": {
			background: darken("#b35bff", 0.1),
		},
		"&:disabled": {
			border: "#e0e0e0",
			background: "#e0e0e0",
			color: "#a6a6a6",
		},
	},
}));

function AddorRemoveAssetsContainer(props) {
	// Value: OPENSEA || ETH_CONTRACT || SOL
	const [importMethod, setImportMethod] = useState("OPENSEA");

	const [activeStep, setActiveStep] = useState(0);

	const [contractAddress, setContractAddress] = useState();

	const classes = useStyles();

	console.log(props);
	console.log(contractAddress);

	const IMPORT_METHODS = {
		OPENSEA: "Import from OpenSea",
		CUSTOM_CONTRACT: "Ethereum Contract",
		SOLANA_WALLET: "Phantom Wallet",
	};

	const ImportOptions = () => {
		const elements = [];
		for (const [key, value] of Object.entries(IMPORT_METHODS)) {
			elements.push(<MenuItem value={key}>{value}</MenuItem>);
		}

		return elements;
	};

	const SelectImportMethod = () => {
		return (
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				spacing={4}
				className={classes.gridContainer}
			>
				<Grid item xs={12} className={classes.gridItem}>
					<Typography class={classes.selectMethodText} variant={"p"}>
						There are various ways to import your existing assets to your
						gallery. Select one and we will retrieve your assets for your
						selection.
					</Typography>
				</Grid>
				<Grid item xs={12} className={classes.gridItem}>
					<Select
						value={importMethod}
						onChange={(event) => {
							setImportMethod(event.target.value);
						}}
					>
						{ImportOptions()}
					</Select>
				</Grid>
				{importMethod === "CUSTOM_CONTRACT" ? (
					<Grid item xs={12} className={classes.gridItem}>
						<Typography variant="h5" component="h2">
							Contract address
						</Typography>
						<TextField
							className={classes.textField}
							variant="outlined"
							placeholder="0xd26330c38C756215Ed82258283fb4c36025D431E"
							fullWidth
							value={contractAddress}
							onChange={(event) => setContractAddress(event.target.value)}
						/>
					</Grid>
				) : (
					<></>
				)}
				<Grid item xs={12} className={classes.gridItem}>
					<Button
						className={classes.nextButton}
						color="primary"
						variant="contained"
						size="large"
						disabled={importMethod === "CUSTOM_CONTRACT" && !contractAddress}
						onClick={() =>
							setActiveStep((prevActiveStep) => prevActiveStep + 1)
						}
					>
						Next
					</Button>
				</Grid>
			</Grid>
		);
	};

	let ImportComponents = {
		OPENSEA: (
			<ImportFromOpensea
				galleryAssets={props.galleryAssets}
				prevButton={props.prevButton}
				handleSubmit={props.handleAddGalleryAssets}
			/>
		),
		ETH_CONTRACT: (
			<ImportFromContract
				prevButton={props.prevButton}
				handleSubmit={props.handleAddGalleryAssets}
				contractAddress={contractAddress}
			/>
		),
		SOLANA_WALLET: (
			<ImportFromPhantomWallet
				galleryAssets={props.galleryAssets}
				prevButton={props.prevButton}
				handleSubmit={props.handleAddGalleryAssets}
			/>
		),
	};

	const addAssetsSteps = [
		<SelectImportMethod />,
		ImportComponents[importMethod],
	];

	return props.add ? (
		addAssetsSteps[activeStep]
	) : (
		<RemoveAssets
			galleryAssets={props.galleryAssets}
			handleChangeGalleryAssets={props.handleRemoveGalleryAssets}
			setShowSelectedView={props.setShowRemoveAssetsView}
		/>
	);
}

export default AddorRemoveAssetsContainer;
