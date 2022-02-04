import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GalleryNftCard from "./GalleryNftCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	nftContainer: {
		maxWidth: "1552px",
		paddingTop: "10vh",
		width: "96vw",
		margin: "auto",
		display: "flex",
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
					{renderNfts(props)}
				</Grid>
			) : (
				<Grid
					container
					direction="row"
					alignItems="center"
					spacing={4}
					className={classes.nftContainer}
				>
					{renderNfts(props)}
				</Grid>
			)}
		</>
	);
};

const renderNfts = (props) => {
	return props.nfts.map((item, i) => {
		let slug = props.slug;
		return (
			<Grid key={i} container item lg={4} md={4} sm={6} xs={12}>
				<GalleryNftCard asset={item} slug={slug} />
			</Grid>
		);
	});
};
export default GalleryNfts;
