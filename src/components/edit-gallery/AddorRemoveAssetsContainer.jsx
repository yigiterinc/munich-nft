import React, { useState } from "react";

import {Select, MenuItem} from '@material-ui/core'
import AddorRemoveAssetsFromOpensea from "./AddorRemoveAssetsFromOpensea";
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
}));

function AddorRemoveAssetsContainer(props) {
	// Value: ETH || ETH_CONTRACT || SOL
	const [importMethod, setImportMethod] = useState(null);

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
						<Select
							value={props.importMethod}
							onChange={(event) => {
								setImportMethod(event.target.value);
								setActiveStep(1);
							}}
						>
							<MenuItem value={"ETH"}>Ethereum</MenuItem>
							<MenuItem value={"SOL"}>Solana</MenuItem>
							<MenuItem value={"ETH_CONTRACT"}>Ethereum Contract</MenuItem>
						</Select>
					</Grid>
				</Grid>
			)
	};

	const SelectedImportComponent = () => {
		if (importMethod === "ETH") {
			return <AddorRemoveAssetsFromOpensea {...props} />;
		} else if (importMethod === "ETH_CONTRACT") {
		} else if (importMethod === "SOL") {
		}
	};

	const stepComponents = [<SelectImportMethod />, <SelectedImportComponent />];

	return stepComponents[activeStep];
}

export default AddorRemoveAssetsContainer;
