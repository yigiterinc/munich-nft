import React from "react";

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
	const [activeStep, setActiveStep] = React.useState(0);

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

	const stepComponents = [
		<UploadArt nextButton={nextButton} />,
		<AddMetadata nextButton={nextButton} />,
		<Mint nextButton={nextButton} />,
		<ListNft nextButton={nextButton} />,
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
