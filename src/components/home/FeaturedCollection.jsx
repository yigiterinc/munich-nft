import React from "react";
import { Paper, Typography, Grid, Item } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "40vw",
		minWidth: "500px",
		borderRadius: "15px",
		boxShadow: "rgba(0, 0, 0, 0.20) 1.95px 1.95px 2.6px;",
	},
	imageContainer: {
		height: "60vh",
	},
	image: {
		maxWidth: "100%",
		minHeight: "100%",
		borderRadius: "15px 15px 0px 0px ",
	},
	body: {
		minHeight: "15vh",
		height: "auto",
		width: "inherit",
		minWidth: "inherit",
		background: "#e1ebe8",
		borderRadius: "0px 0px 15px 15px",
		display: "flex",
		justifyContent: "space-between",
		flexWrap: "wrap",
		paddingBottom: "2px",
	},
	flexItem: {
		boxSizing: "border-box",
		width: "50%",
	},
	bodyLabel: {
		margin: "18px 20px",
		fontSize: "24px",
		fontWeight: "1.5",
		letterSpacing: "1.2px",
		textTransform: "capitalize",
		width: "calc(50%- 20px)",
	},
}));

const dummyCollectionData = {
	name: "Cool Staircases",
	nftName: "One with the lights",
	price: "1",
	currency: "eth",
	image:
		"https://images.unsplash.com/photo-1635718408177-50b4d9b59226?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
};

function FeaturedCollection() {
	const classes = useStyles();

	const Image = () => {
		return (
			<div className={classes.imageContainer}>
				<img
					className={classes.image}
					src={dummyCollectionData.image}
					alt="img"
				/>
			</div>
		);
	};

	const Body = () => {
		return (
			<div className={classes.body}>
				<div className={classes.flexItem}>
					<Typography variant="h2" className={classes.bodyLabel}>
						{dummyCollectionData.name}
					</Typography>
				</div>
				<div>
					<Typography variant="h2" className={classes.bodyLabel}>
						Price
					</Typography>
				</div>
				<div className={classes.flexItem}>
					<Typography variant="h2" className={classes.bodyLabel}>
						{dummyCollectionData.nftName}
					</Typography>
				</div>
				<div>
					<Typography variant="h2" className={classes.bodyLabel}>
						{dummyCollectionData.price} {dummyCollectionData.currency}
					</Typography>
				</div>
				<div className={classes.flexItem}>
					<Typography variant="h2" className={classes.bodyLabel}>
						MARKET_LOGO
					</Typography>
				</div>
				<div>
					<Typography variant="h2" className={classes.bodyLabel}>
						FAV_BUTTON
					</Typography>
				</div>
			</div>
		);
	};

	return (
		<div className={classes.root}>
			{Image()}
			{Body()}
		</div>
	);
}

export default FeaturedCollection;
