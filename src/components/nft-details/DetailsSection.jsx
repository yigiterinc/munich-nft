import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";

import { SOL_NETWORK, ETH_NETWORK } from "../../config/config";

const useStyles = makeStyles((theme) => ({
	explorerButtonPanel: {
		textAlign: "center",
		marginBottom: "1vh",
	},
	detailsContainer: {
		display: "flex",
		flexDirection: "column",
		gap: "16px",
		marginTop: "6.5vh",
	},
	link: {
		fontWeight: "500",
		color: theme.palette.primary.main,
		cursor: "pointer",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "underline",
		},
	},
	ownedByLink: {
		fontWeight: "lighter",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "underline",
		},
		color: theme.palette.primary.main,
		lineHeight: "30px",
	},
	ownedBy: {
		display: "flex",
		textAlign: "center",
		marginTop: "2.5vh",
	},
	ownedByBox: {
		marginLeft: "0.5vw",
	},
	box: {
		lineHeight: "30px",
	},
	desriptionBox: {
		textOverflow: "ellipsis",
	},
}));

const DetailsSection = (nftJson) => {
	let explorerPath;
	let creatorPath;
	let tokenStandard;

	if (nftJson.blockchain === "Ethereum") {
		explorerPath =
			ETH_NETWORK === "mainnet"
				? "https://etherscan.io/address/"
				: "https://rinkeby.etherscan.io/address/";
		explorerPath += nftJson.contractAddressId;

		tokenStandard =
			nftJson.tokenStandard.substring(0, 3) +
			"-" +
			nftJson.tokenStandard.slice(3, 7);

		creatorPath =
			ETH_NETWORK === "mainnet"
				? "https://opensea.io/"
				: "https://testnets.opensea.io/";

		creatorPath += nftJson.createdBy;
	}

	if (nftJson.blockchain === "Solana") {
		explorerPath = "https://explorer.solana.com/address/" + nftJson.mint;
		if (SOL_NETWORK === "devnet") {
			explorerPath = explorerPath + "?cluster=devnet";
		}

		let creators = [];
		nftJson.creators.forEach((creator, index) => {
			creators.push(`Creator ${index + 1}: ${creator.address}`);
		});

		// listItems.push(
		// 	"Blockchain: " + nftJson.blockchain,
		// 	"Update Authority: " + nftJson.updateAuthority
		// );
		// listItems = listItems.concat(creators);
	}

	const classes = useStyles();
	return (
		<Box className={classes.detailsContainer}>
			<Box className={classes.box}>
				Blockchain: <b>{nftJson.blockchain}</b>
			</Box>
			{tokenStandard && (
				<Box className={classes.box}>
					Token Standard: <b>{tokenStandard}</b>
				</Box>
			)}
			<Box className={classes.desriptionBox}>
				Description:{" "}
				<Typography component="span" className={classes.descriptionText}>
					{nftJson.description || "No description"}
				</Typography>
			</Box>
		</Box>
	);
};

export default DetailsSection;
