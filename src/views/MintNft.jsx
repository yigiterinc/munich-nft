import { React, useState } from "react";

import "../config/config";

import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import Web3 from "web3";

import AddMetadata from "../components/mint-nft/AddMetadata";
import ListNft from "../components/mint-nft/ListNft";
import Mint from "../components/mint-nft/Mint";
import UploadArt from "../components/mint-nft/UploadArt";

let web3;

if (Web3.givenProvider) {
	web3 = new Web3(Web3.givenProvider || "ws://some.local-or-remote.node:8546");
}

function MintNft() {
	const [activeStep, setActiveStep] = useState(0);

	const [fileUploadResult, setFileUploadResult] = useState(null);
	const [ipfsDialogOpen, setIpfsDialogOpen] = useState(false);

	const getSteps = () => {
		return [
			"Upload your Art",
			"Add Information to it",
			"Mint your NFT",
			"List it for Sale",
		];
	};

	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const nextButton = (
		<Button
			color="primary"
			size="large"
			onClick={handleNext}
			variant="outlined"
			size="large"
		>
			Next
		</Button>
	);

	const handleReset = () => {};

	const onFileUploaded = (path) => {
		setFileUploadResult(path);
	};

	const resetButton = (
		<Button
			color="primary"
			size="large"
			onClick={handleReset}
			variant="outlined"
			size="large"
		>
			Done - Mint another!
		</Button>
	);

	const stepComponents = [
		<UploadArt
			nextButton={nextButton}
			setIpfsDialogOpen={setIpfsDialogOpen}
			onUploaded={onFileUploaded}
			fileUploadResult={fileUploadResult}
		/>,
		<AddMetadata nextButton={nextButton} />,
		<Mint nextButton={nextButton} />,
		<ListNft resetButton={resetButton} />,
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

export default MintNft;
