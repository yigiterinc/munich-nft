import React from "react";
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
	const classes = useStyles();
	let network = NETWORK === "main" ? "ethereum" : NETWORK;
	return (
		<div className={classes.detailsTabContainer}>
			<div className={classes.ethScanButtonPanel}>
				<Button
					className={classes.ethScanButton}
					variant="contained"
					href={"https://etherscan.io/address/" + nftJson.contractAddressId}
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
						primary={
							"Token Standard: " +
							nftJson.tokenStandard.substring(0, 3) +
							"-" +
							nftJson.tokenStandard.slice(3, 7)
						}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						className={classes.listItemText}
						primary={
							"Blockchain: " +
							network.charAt(0).toUpperCase() +
							network.slice(1)
						}
					/>
				</ListItem>
			</List>
		</div>
	);
};

export default DetailsTab;
