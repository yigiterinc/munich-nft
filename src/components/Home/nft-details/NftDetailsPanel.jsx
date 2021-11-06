import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	headerContainer: {},
	collectionLink: {
		height: "100%",
	},
	creatorAndCollectionTab: {
		display: "flex",
		paddingLeft: 32,
		paddingRight: 32,
	},
});

const NftDetailsPanel = (nft) => {
	const classes = useStyles();

	return (
		<Grid item xs={5}>
			<div className={classes.headerContainer}>
				{/* <Link className={classes.collectionLink} href="#">
					{nft.nft.collection}
				</Link> */}
				<Typography className={classes.nftName} variant="h4">
					{nft.nft.name}
				</Typography>
			</div>
			<div className="creatorAndCollectionTab">
				<div className="creatorTab">
					<Typography>Creator</Typography>
				</div>
				<div className="collectionTab">
					<Typography>Collection</Typography>
				</div>
			</div>
		</Grid>
	);
};

export default NftDetailsPanel;
