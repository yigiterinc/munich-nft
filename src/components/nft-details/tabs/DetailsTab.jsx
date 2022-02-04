import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, List, ListItem, ListItemText } from "@material-ui/core";
import { SOL_NETWORK, ETH_NETWORK } from "../../../config/config";

const useStyles = makeStyles((theme) => ({
	listItemText: {
		color: theme.palette.text.primary,
		"& span, & svg": {
			fontSize: "14px",
			padding: 0,
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
			overflow: "hidden",
		},
	},
	explorerButtonPanel: {
		textAlign: "center",
		marginBottom: "1vh",
	},
}));

const DetailsTab = (nftJson) => {
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
			"Blockchain: " + nftJson.blockchain,
			"Contract: " + nftJson.contractAddressId,
			"Token ID: " + nftJson.tokenId,
			"Token Standard: " + tokenStandard,
			"Network: " + network
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
		<div className={classes.detailsTabContainer}>
			<div className={classes.explorerButtonPanel}>
				<Button
					href={explorerPath}
					color="primary"
					variant="contained"
					target="_blank"
					rel="noopener noreferrer"
				>
					View on Explorer
				</Button>
			</div>
			<List component={"span"}>
				{listItems.map((item) => {
					return (
						<ListItem>
							<ListItemText className={classes.listItemText} primary={item} />
						</ListItem>
					);
				})}
			</List>
		</div>
	);
};

export default DetailsTab;
