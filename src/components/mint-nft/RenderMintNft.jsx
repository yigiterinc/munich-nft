import React, { useState } from "react";

import { Button, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AddMetadata from "./AddMetadata";
import ListNft from "./ListNft";
import UploadArt from "./UploadArt";
import Mint from "./Mint";

const useStyles = makeStyles((theme) => ({
	pageContainer: {
		padding: "5vh 3vw",
	},
	navigationButton: {
		margin: theme.spacing(2),
		padding: "13px 25px",
	},
	mainLabel: {
		letterSpacing: 1.3,
		textAlign: "center",
		marginBottom: "5vh",
	},
}));

function RenderMintNft(props) {
	const [activeStep, setActiveStep] = useState(0);

	const classes = useStyles();

	const nextButton = (
		<Button
			className={classes.navigationButton}
			color="primary"
			size="large"
			onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
			variant="outlined"
		>
			Next
		</Button>
	);

	const prevButton = (
		<Button
			className={classes.navigationButton}
			color="primary"
			size="large"
			onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
			variant="outlined"
		>
			Previous
		</Button>
	);

	const resetProgress = () => {
		props.resetState();
		setActiveStep(0);
	};

	const resetButton = (
		<Button
			className={classes.navigationButton}
			color="primary"
			size="large"
			onClick={() => resetProgress()}
			variant="outlined"
		>
			Done - Mint another!
		</Button>
	);

	const getSteps = () => {
		return [
			"Upload your Art",
			"Add Information to it",
			"Mint your NFT",
			"List it for Sale",
		];
	};

	const steps = getSteps();

	const stepComponents = [
		<UploadArt
			nextButton={nextButton}
			setAddedFileHash={props.setAddedFileHash}
			addedFileHash={props.addedFileHash}
		/>,
		<AddMetadata
			uploadedMetadata={props.uploadedMetadata}
			addedFileHash={props.addedFileHash}
			nextButton={nextButton}
			prevButton={prevButton}
			setUploadedMetadata={props.setUploadedMetadata}
			nftName={props.nftName}
			nftDescription={props.nftDescription}
			setNftDescription={props.setNftDescription}
			setNftName={props.setNftName}
		/>,
		<Mint
			nextButton={nextButton}
			prevButton={prevButton}
			uploadedMetadata={props.uploadedMetadata}
			mintedNft={props.mintedNft}
			setMintedNft={props.setMintedNft}
			setResultingTokenId={props.setResultingTokenId}
		/>,
		<ListNft
			resetButton={resetButton}
			prevButton={prevButton}
			listedNft={props.listedNft}
			setListedNft={props.setListedNft}
			listingPrice={props.listingPrice}
			setListingPrice={props.setListingPrice}
			resultingTokenId={props.resultingTokenId}
		/>,
	];

	const renderProgressStepper = () => {
		return (
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		);
	};

	const renderCurrentStepComponent = () => (
		<div>{stepComponents[activeStep]}</div>
	);

	return (
		<div className={classes.pageContainer}>
			<Typography className={classes.mainLabel} variant="h4">
				Mint NFT
			</Typography>
			{renderProgressStepper()}
			{renderCurrentStepComponent()}
		</div>
	);
}

export default RenderMintNft;
