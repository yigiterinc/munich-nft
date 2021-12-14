import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { NETWORK } from "../../../config/config";

const useStyles = makeStyles({
	listItemText: {
		"& span, & svg": {
			fontSize: "14px",
			padding: 0,
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
			overflow: "hidden",
		},
	},
	ethScanButtonPanel: {
		textAlign: "center",
		marginBottom: "1vw",
	},
});

const DetailsTab = (nftJson) => {
	const computeBlockchain = () => {
		return "Blockchain: " + network.charAt(0).toUpperCase() + network.slice(1);
	};
	const computeTokenStandard = () => {
		return (
			"Token Standard: " +
			nftJson.tokenStandard.substring(0, 3) +
			"-" +
			nftJson.tokenStandard.slice(3, 7)
		);
	};

	const classes = useStyles();
	const network = NETWORK === "main" ? "ethereum" : NETWORK;
	const blockchain = useMemo(() => computeBlockchain(network), [network]);
	const tokenStandard = useMemo(() => computeTokenStandard(), [nftJson]);
	const etherscanPath =
		network === "ethereum"
			? "https://etherscan.io/address/"
			: "https://rinkeby.etherscan.io/address/";

	return (
		<div className={classes.detailsTabContainer}>
			<div className={classes.ethScanButtonPanel}>
				<Button
					className={classes.ethScanButton}
					variant="contained"
					href={etherscanPath + nftJson.contractAddressId}
					target="_blank"
					rel="noopener noreferrer"
				>
					View on ETHScan
				</Button>
			</div>
			<Divider />
			<List component={"span"}>
				<ListItem>
					<ListItemText
						className={classes.listItemText}
						primary={"Contract: " + nftJson.contractAddressId}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						className={classes.listItemText}
						primary={"Token ID: " + nftJson.tokenId}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						className={classes.listItemText}
						primary={tokenStandard}
					/>
				</ListItem>
				<ListItem>
					<ListItemText className={classes.listItemText} primary={blockchain} />
				</ListItem>
			</List>
		</div>
	);
};

export default DetailsTab;
