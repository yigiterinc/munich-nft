import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
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
					href={etherscanPath + nftJson.contractAddressId}
					className={classes.ethScanButton}
					variant="contained"
					target="_blank"
					rel="noopener noreferrer"
				>
					{" "}
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
