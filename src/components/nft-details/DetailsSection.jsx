import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { SOL_NETWORK, ETH_NETWORK } from "../../config/config";

const useStyles = makeStyles((theme) => ({
	listItemText: {
		color: theme.palette.text.primary,
		fontSize: "16px",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		overflow: "hidden",
	},
	explorerButtonPanel: {
		textAlign: "center",
		marginBottom: "1vh",
	},
}));

const DetailsSection = (nftJson) => {
	let explorerPath;
	let listItems = [];

	if (nftJson.blockchain === "Ethereum") {
		explorerPath =
			ETH_NETWORK === "mainnet"
				? "https://etherscan.io/address/"
				: "https://rinkeby.etherscan.io/address/";
		explorerPath += nftJson.contractAddressId;

		const tokenStandard =
			nftJson.tokenStandard.substring(0, 3) +
			"-" +
			nftJson.tokenStandard.slice(3, 7);

		const network =
			ETH_NETWORK?.charAt(0)?.toUpperCase() + ETH_NETWORK?.slice(1);

		listItems.push(
			"Created By: " + "Test123", // not coming from nftJson
			"Owned By: " + "test123", // not coming from nftJson
			"Blockchain: " + nftJson.blockchain,
			"Network: " + network,
			"Token ID: " + nftJson.tokenId,
			"Token Standard: " + tokenStandard
		);
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

		listItems.push(
			"Blockchain: " + nftJson.blockchain,
			"Update Authority: " + nftJson.updateAuthority
		);
		listItems = listItems.concat(creators);
	}

	const classes = useStyles();

	return (
		<div>
			<List>
				{listItems.map((item) => {
					return (
						<ListItem disableGutters={true}>
							<ListItemText
								disableTypography
								className={classes.listItemText}
								primary={item}
							/>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
};

export default DetailsSection;
