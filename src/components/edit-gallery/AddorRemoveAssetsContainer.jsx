import React, { useState } from "react";

import { Select, MenuItem, Typography, Button } from "@material-ui/core";
import RemoveAssets from "./RemoveAssets";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

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
	}
}));

function AddorRemoveAssetsContainer(props) {
	// Value: OPENSEA || ETH_CONTRACT || SOL
	const [importMethod, setImportMethod] = useState("OPENSEA");

	const [activeStep, setActiveStep] = useState(0);

	const classes = useStyles()

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
						<Select
							value={importMethod}
							onChange={(event) => {
								setImportMethod(event.target.value);
							}}
						>
							<MenuItem value={"OPENSEA"}>Opensea</MenuItem>
							<MenuItem value={"SOL"}>Solana</MenuItem>
							<MenuItem value={"ETH_CONTRACT"}>Ethereum Contract</MenuItem>
						</Select>
					</Grid>

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

	const SelectedImportComponent = () => {
		if (importMethod === "OPENSEA") {
			return <RemoveAssets {...props} />;
		} else if (importMethod === "ETH_CONTRACT") {
		} else if (importMethod === "SOL") {
		}
	};

	const stepComponents = [<SelectImportMethod />, <SelectedImportComponent />];

	return stepComponents[activeStep];
}

export default AddorRemoveAssetsContainer;
