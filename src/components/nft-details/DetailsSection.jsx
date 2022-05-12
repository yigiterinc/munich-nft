import React from "react";
import { makeStyles, Box, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { List, ListItem, ListItemText } from "@material-ui/core";
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
		marginTop: "2vh",
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
}));

const DetailsSection = (nftJson) => {
	let explorerPath;
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
			<Box className={classes.ownedBy}>
				<Avatar
					style={{
						maxWidth: "28px",
						maxHeight: "28px",
						minWidth: "28px",
						minHeight: "28px",
					}}
				>
					<AccountCircleIcon />
				</Avatar>
				<Box className={classes.ownedByBox}>
					Owned By <Link className={classes.ownedByLink}>Test123</Link>
				</Box>
			</Box>
			<Box className={classes.box}>
				Created by: <Link className={classes.link}>Test123</Link>
			</Box>
			<Box className={classes.box}>
				Blockchain: <b>{nftJson.blockchain}</b>
			</Box>
			<Box className={classes.box}>
				Token Standard: <b>{tokenStandard}</b>
			</Box>
		</Box>
	);
};

export default DetailsSection;
