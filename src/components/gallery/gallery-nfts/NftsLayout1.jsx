import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AssetCard from "../../common/AssetCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	nftContainer: {
		paddingTop: "4vh",
		width: "80vw",
	},
	firstNftContainer: {
		marginBottom: "2vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	otherNftsContainer: {
		justifyContent: "center",
	},
}));

const NftsLayout1 = (props) => {
	let firstNft = props.nfts[0];
	let otherNfts = props.nfts.slice(1);
	const classes = useStyles();
	return (
		<div className={classes.nftContainer}>
			<div className={classes.firstNftContainer}>
				<AssetCard asset={firstNft} priorNft={true} />
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

export default NftsLayout1;
