import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import { NETWORK, ETH_NETWORK } from "../../../config/config";

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
	ethScanButtonPanel: {
		textAlign: "center",
		marginBottom: "1vw",
	},
	divider: {
		backgroundColor: theme.palette.text.primary,
	},
}));

const DetailsTab = (nftJson) => {
	const computeBlockchain = () => {
		return (
			"Blockchain: " +
			ETH_NETWORK?.charAt(0)?.toUpperCase() +
			ETH_NETWORK?.slice(1)
		);
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
	const blockchain = useMemo(
		() => computeBlockchain(ETH_NETWORK),
		[ETH_NETWORK]
	);
	const tokenStandard = useMemo(() => computeTokenStandard(), [nftJson]);
	const etherscanPath =
		ETH_NETWORK === "mainnet"
			? "https://etherscan.io/address/"
			: "https://rinkeby.etherscan.io/address/";

	return (
		<div className={classes.detailsTabContainer}>
			<div className={classes.ethScanButtonPanel}>
				<Button
					href={etherscanPath + nftJson.contractAddressId}
					className={classes.ethScanButton}
					color="primary"
					variant="outlined"
					target="_blank"
					rel="noopener noreferrer"
				>
					View on ETHScan
				</Button>
			</div>
			<Divider className={classes.divider} />
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
