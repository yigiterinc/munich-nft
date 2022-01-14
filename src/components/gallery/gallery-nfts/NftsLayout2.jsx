import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AssetCard from "../../common/AssetCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	nftContainer: {
		paddingTop: "10vh",
		width: "80vw",
	},
	priorNftsContainer: {
		marginBottom: "4vh",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	priorNft: {
		margin: theme.spacing(4),
	},
	otherNftsContainer: {
		justifyContent: "center",
	},
}));

const NftsLayout2 = (props) => {
	let priorNfts = [];
	let otherNfts = [];
	if (props.nfts.length >= 2) {
		priorNfts.push(props.nfts[0]);
		priorNfts.push(props.nfts[1]);
		otherNfts = props.nfts.slice(2);
	} else {
		priorNfts.push(props.nfts[0]);
		otherNfts = props.nfts.slice(1);
	}
	const classes = useStyles();
	return (
		<div className={classes.nftContainer}>
			<div className={classes.priorNftsContainer}>
				{priorNfts.map((nft) => {
					return (
						<div className={classes.priorNft}>
							<AssetCard asset={nft} priorNft={true} />
						</div>
					);
				})}
			</div>
			<Grid container spacing={4} className={classes.otherNftsContainer}>
				{otherNfts.map((item) => {
					return (
						<Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
							<AssetCard asset={item} />
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};

export default NftsLayout2;
