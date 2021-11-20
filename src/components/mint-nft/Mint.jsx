import React, { useState } from "react";
import {
	Container,
	Button,
	Typography,
	CircularProgress,
	Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { mintNft } from "../../api/chainHelper";

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
	},
	title: {
		margin: 40,
	},
	mintButton: {
		margin: theme.spacing(1),
	},
	info: {
		fontSize: "17px",
		marginBottom: "3vh",
		letterSpacing: "1px",
	},
	textContainer: {
		maxWidth: "40vw",
		margin: "0 auto",
	},
	progress: {
		display: "flex",
		justifyContent: "center",
		marginTop: "6vh",
	},
}));

function Mint({
	nextButton,
	prevButton,
	mintedNft,
	setMintedNft,
	uploadedMetadata,
	setResultingTokenId,
}) {
	const classes = useStyles();

	const [mintInProgress, setMintInProgress] = useState(false);

	const mint = async () => {
		setMintInProgress(true);

		const mintingResult = await mintNft(uploadedMetadata, 300000);

		setMintedNft(mintingResult.blockhash);
		setResultingTokenId(mintingResult.id);
		setMintInProgress(false);
	};

	const mintButton = () => {
		return (
			<Button
				className={classes.mintButton}
				color="primary"
				size="large"
				variant="outlined"
				onClick={() => mint()}
			>
				Mint!
			</Button>
		);
	};

	const renderMintingResult = () => {
		return (
			<Container>
				<Typography className={classes.title} variant="body2">
					Minted: {mintedNft}
				</Typography>
				{prevButton}
				{nextButton}
			</Container>
		);
	};

	const renderMintPrompt = () => {
		return (
			<Container>
				<Typography className={classes.title} variant="h5">
					Mint your NFT
				</Typography>
				<div className={classes.textContainer}>
					<Typography className={classes.info} variant="body1">
						We are almost there! Now let's mint your NFT on the Ethereum
						blockchain. This might take some time to be completed.
					</Typography>
				</div>
				{mintButton()}
			</Container>
		);
	};

	const renderSpinner = () => {
		return (
			<Box className={classes.progress}>
				<CircularProgress />
			</Box>
		);
	};

	const getRenderContent = () => {
		if (mintedNft) {
			return renderMintingResult();
		} else if (mintInProgress) {
			return renderSpinner();
		} else {
			return renderMintPrompt();
		}
	};

	return <div className={classes.root}>{getRenderContent()}</div>;
}

export default Mint;
