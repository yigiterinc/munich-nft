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
	let firstNft = props.nfts[0];
	let secondNft = props.nfts[1];
	let otherNfts = props.nfts.slice(2);
	const classes = useStyles();
	return (
		<div className={classes.nftContainer}>
			<div className={classes.priorNftsContainer}>
				<div className={classes.priorNft}>
					<AssetCard asset={firstNft} priorNft={true} />
				</div>
				<div className={classes.priorNft}>
					<AssetCard asset={secondNft} priorNft={true} />
				</div>
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
