import { React, useState } from "react";

import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AddMetadata from "./AddMetadata";
import ListNft from "./ListNft";
import UploadArt from "./UploadArt";
import Mint from "./Mint";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));

function RenderMintNft(props) {
	const [activeStep, setActiveStep] = useState(0);

	const classes = useStyles();

	const nextButton = (
		<Button
			className={classes.button}
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
			className={classes.button}
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
			className={classes.button}
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
			onUploaded={props.onFileAdded}
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

	return (
		<div>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>{stepComponents[activeStep]}</div>
		</div>
	);
}

export default RenderMintNft;
