import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GalleryCard from "./GalleryCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	nftContainer: {
		maxWidth: "1552px",
		paddingTop: "10vh",
		width: "98vw",
	},
}));

const GalleryNfts = (props) => {
	const classes = useStyles();
	return (
		<>
			{props.nfts.length <= 2 ? (
				<Grid
					container
					direction="row"
					alignItems="center"
					justifyContent="center"
					spacing={4}
					className={classes.nftContainer}
				>
					{props.nfts.map((item) => {
						return (
							<Grid key={item.id} container item lg={4} md={4} sm={6} xs={12}>
								<GalleryCard asset={item} />
							</Grid>
						);
					})}
				</Grid>
			) : (
				<Grid
					container
					direction="row"
					alignItems="center"
					spacing={4}
					className={classes.nftContainer}
				>
					{props.nfts.map((item) => {
						return (
							<Grid key={item.id} container item lg={4} md={4} sm={6} xs={12}>
								<GalleryCard asset={item} />
							</Grid>
						);
					})}
				</Grid>
			)}
		</>
	);
};

export default GalleryNfts;
