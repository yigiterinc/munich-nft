import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GalleryCard from "./GalleryCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	nftContainer: {
		paddingTop: "10vh",
		width: "80vw",
	},
}));

const NftsDefaultLayout = (props) => {
	const classes = useStyles();
	return (
		<Grid container spacing={4} className={classes.nftContainer}>
			{props.nfts.map((item) => {
				return (
					<Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
						<GalleryCard asset={item} />
					</Grid>
				);
			})}
		</Grid>
	);
};

export default NftsDefaultLayout;
