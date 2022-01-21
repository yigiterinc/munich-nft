import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { listNftOnOpensea } from "../../api/opensea.js";
import withSpinner from "../common/WithSpinner";
import { getLoggedInUser } from "../../utils/auth-utils";

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
	},
	title: {
		fontSize: "25px",
		marginTop: "2vh",
		marginBottom: "2vh",
		letterSpacing: "1px",
	},
	info: {
		display: "block",
		marginTop: "2vh",
		fontSize: "20px",
		marginBottom: "2vh",
		letterSpacing: "0.6px",
	},
	price: {
		display: "block",
		marginBottom: "2vh",
	},
}));

function ListNft({
	resetButton,
	listedNft,
	setListedNft,
	listingPrice,
	setListingPrice,
	resultingTokenId,
}) {
	const classes = useStyles();

	const [listingInProgress, setListingInProgress] = useState(false);

	const list = async () => {
		// ! This is an arbitrary expirationTime, this will be changed in future task
		// ! We will ask user to set that, that is why code is left ugly
		setListingInProgress(true);
		const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24 * 365);
		const user = getLoggedInUser();
		const listing = await listNftOnOpensea(
			expirationTime,
			resultingTokenId,
			listingPrice,
			user.walletAddress
		);
		setListedNft(listing.hash);
		setListingInProgress(false);
	};

	const ListingResult = () => {
		return (
			<Container style={{ textAlign: "center" }}>
				<Typography className={classes.info} variant="body2">
					Listed: {listedNft}
				</Typography>
				{resetButton}
			</Container>
		);
	};

	const ListingPrompt = () => {
		return (
			<Container>
				<Typography className={classes.title} variant="h5">
					List your NFT
				</Typography>
				<Typography variant="p" className={classes.info}>
					Listing means putting it on sale on OpenSea
				</Typography>
				<TextField
					className={classes.price}
					variant="outlined"
					placeholder="Price"
					value={listingPrice}
					onChange={(event) => setListingPrice(event.target.value)}
				/>

				<Button
					color="primary"
					size="large"
					variant="outlined"
					onClick={() => list()}
				>
					List!
				</Button>
			</Container>
		);
	};

	const getRenderContent = () => {
		if (listedNft) {
			return ListingResult();
		} else {
			return withSpinner(ListingPrompt(), listingInProgress, {
				justifyContent: "center",
				marginTop: "6vh",
			});
		}
	};

	return <div className={classes.root}>{getRenderContent()}</div>;
}

export default ListNft;
