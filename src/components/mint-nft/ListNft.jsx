import React from "react";
import { Typography, Container, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { listNft } from "../../api/chainHelper";

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

	const list = async () => {
		// ! This is an arbitrary expirationTime, this will be changed in future task
		// ! We will ask user to set that, that is why code is left ugly
		const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24 * 365);
		const listing = await listNft(
			expirationTime,
			resultingTokenId,
			listingPrice
		);
		setListedNft(listing.hash);
	};

	const showListingResult = () => {
		return (
			<Container style={{ textAlign: "center" }}>
				<Typography variant="body2">Listed: {listedNft}</Typography>
				{resetButton}
			</Container>
		);
	};

	const showListingPrompt = () => {
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

	return (
		<div className={classes.root}>
			{listedNft ? showListingResult() : showListingPrompt()}
		</div>
	);
}

export default ListNft;
