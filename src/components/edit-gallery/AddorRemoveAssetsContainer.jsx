import React, { useState } from "react";

import { Select, MenuItem, Typography, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ImportFromOpensea from "../create-gallery/ImportFromOpensea";
import ImportFromContract from "../create-gallery/ImportFromContract";
import ImportFromPhantomWallet from "../create-gallery/ImportFromPhantomWallet";
import TextField from "@material-ui/core/TextField";
import RemoveAssets from "./RemoveAssets";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		paddingTop: "3vw",
		paddingLeft: "10vw",
		paddingRight: "10vw",
	},
	gridItem: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	selectMethodText: {
		fontSize: "20px",
	},
	textField: {
		marginTop: 20,
		[theme.breakpoints.up("xs")]: {
			width: "70vw",
		},
		[theme.breakpoints.up("sm")]: {
			width: "60vw",
		},
		[theme.breakpoints.up("md")]: {
			width: "45vw",
		},
		[theme.breakpoints.up("lg")]: {
			width: "30vw",
		},
	},
}));

function AddorRemoveAssetsContainer(props) {
	// Value: OPENSEA || ETH_CONTRACT || SOL
	const [importMethod, setImportMethod] = useState("OPENSEA");

	const [activeStep, setActiveStep] = useState(0);

	const [contractAddress, setContractAddress] = useState();

	const classes = useStyles()

	console.log(props);

	const IMPORT_METHODS = {
		OPENSEA: "Opensea",
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
						<Typography classes={classes.selectMethodText} variant={"p"}>
							How would you like to add or NFTs to your gallery?
						</Typography>
					</Grid>

					<Grid item xs={12} className={classes.gridItem}>
						<Typography variant="h5" component="h2">
							Import Method
						</Typography>
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
							color="primary"
							size="large"
							onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
							variant="outlined"
						>
							Next
						</Button>
					</Grid>
				</Grid>
			)
	};

	let ImportComponents = {
		OPENSEA: (
			<ImportFromOpensea
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
				prevButton={props.prevButton}
				handleSubmit={props.handleAddGalleryAssets}
			/>
		),
	};

	const addAssetsSteps = [<SelectImportMethod />, ImportComponents[importMethod]];

	return props.add ?
		addAssetsSteps[activeStep] :
		<RemoveAssets galleryAssets={props.galleryAssets}
									handleChangeGalleryAssets={props.handleRemoveGalleryAssets}
								  setShowSelectedView={props.setShowRemoveAssetsView}/>;
}

export default AddorRemoveAssetsContainer;
