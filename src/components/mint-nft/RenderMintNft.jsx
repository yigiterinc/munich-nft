import { React, useState } from "react";

import { Stepper, Step, StepLabel, Button } from "@material-ui/core";

import AddMetadata from "./AddMetadata";
import ListNft from "./ListNft";
import UploadArt from "./UploadArt";
import Mint from "./Mint";

function RenderMintNft(props) {
	const [activeStep, setActiveStep] = useState(0);

	const nextButton = (
		<Button
			color="primary"
			size="large"
			onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
			variant="outlined"
			size="large"
		>
			Next
		</Button>
	);

	const prevButton = (
		<Button
			color="primary"
			size="large"
			onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
			variant="outlined"
			size="large"
		>
			Previous
		</Button>
	);

	const resetButton = (
		<Button
			color="primary"
			size="large"
			onClick={props.handleReset}
			variant="outlined"
			size="large"
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
		<AddMetadata nextButton={nextButton} prevButton={prevButton} />,
		<Mint nextButton={nextButton} prevButton={prevButton} />,
		<ListNft resetButton={resetButton} prevButton={prevButton} />,
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
