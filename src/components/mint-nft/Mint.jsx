import React, { useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { mintErc721Token } from "../../api/eth.js";
import withSpinner from "../common/WithSpinner";
import { getLoggedInUser } from "../../utils/auth-utils";

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

		const user = getLoggedInUser();
		const mintingResult = await mintErc721Token(
			uploadedMetadata,
			300000,
			user.walletAddress
		);

		setMintedNft(mintingResult.blockhash);
		setResultingTokenId(mintingResult.id);
		setMintInProgress(false);
	};

	const MintButton = () => {
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

	const MintingResult = () => {
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

	const MintPrompt = () => {
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
				{MintButton()}
			</Container>
		);
	};

	const getRenderContent = () => {
		if (mintedNft) {
			return MintingResult();
		} else {
			return withSpinner(MintPrompt(), mintInProgress, {
				justifyContent: "center",
				marginTop: "6vh",
			});
		}
	};

	return <div className={classes.root}>{getRenderContent()}</div>;
}

export default Mint;
