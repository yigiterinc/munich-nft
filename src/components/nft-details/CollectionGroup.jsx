import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";

import { SOL_NETWORK, ETH_NETWORK } from "../../config/config";
import { truncateWalletAddress } from "../../utils/commons";

const useStyles = makeStyles((theme) => ({
	collectionSection: {
		maxWidth: "60%",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		overflow: "hidden",
		paddingTop: "10px",
	},
	collectionLink: {
		fontSize: "17px",
		color: theme.palette.primary.main,
		cursor: "pointer",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "underline",
		},
	},
	contractSection: {
		paddingTop: "10px",
		fontWeight: "lighter",
	},
	icon: {
		paddingRight: "0.5vw",
	},
}));

const CollectionGroup = (props) => {
	const classes = useStyles();
	let explorerPath;

	if (props.nftJson.blockchain === "Ethereum") {
		explorerPath =
			ETH_NETWORK === "mainnet"
				? "https://etherscan.io/address/"
				: "https://rinkeby.etherscan.io/address/";
		explorerPath += props.nftJson.contractAddressId;
	} else if (props.nftJson.blockchain === "Solana") {
		explorerPath = "https://explorer.solana.com/address/" + props.nftJson.mint;
		if (SOL_NETWORK === "devnet") {
			explorerPath = explorerPath + "?cluster=devnet";
		}
	}
	return (
		<>
			<div className={classes.collectionSection}>
				<Link
					className={classes.collectionLink}
					to={`/collection/${props.nftJson.slug}`}
				>
					{props.nftJson.collection}
				</Link>
			</div>
			<div className={classes.contractSection}>
				<MuiLink
					className={classes.collectionLink}
					href={explorerPath}
					target="_blank"
					rel="noopener noreferrer"
				>
					{`${truncateWalletAddress(`${props.nftJson.contractAddressId}`, 13)}`}
				</MuiLink>
			</div>
		</>
	);
};

export default CollectionGroup;
