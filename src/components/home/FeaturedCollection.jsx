import React from "react";
import { Paper, Typography, Grid, Item } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { MdOutlineFavoriteBorder } from "react-icons/md";

import EthereumLogo from "../../assets/images/ethereum.png";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "40vw",
		minWidth: "500px",
		borderRadius: "15px",
		boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
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
		letterSpacing: "1.2px",
		textTransform: "capitalize",
		width: "calc(50%- 20px)",
	},
	ethLogo: {
		display: "flex",
		alignItems: "center",
	},
	favButton: {
		width: 40,
		height: 40,
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

				<div className={classes.ethLogo}>
					<img src={EthereumLogo} alt="eth-logo" height={40} />
					<Typography variant="h2" className={classes.bodyLabel}>
						{dummyCollectionData.price} {dummyCollectionData.currency}
					</Typography>
				</div>
				<div className={classes.flexItem}>
					<Typography variant="h2" className={classes.bodyLabel}>
						{dummyCollectionData.nftName}
					</Typography>
				</div>

				<div className={classes.flexItem}></div>

				<div className={classes.flexItem}>
					<IconButton
						target="_blank"
						rel="noopener noreferrer"
						size="small"
						disableRipple
						disableFocusRipple
						className={classes.bodyLabel}
					>
						<img
							className={classes.marketLogo}
							src={"images/openseaLogo.png"}
							alt="market-logo"
							height={35}
							width={35}
						/>
					</IconButton>
				</div>
				<div>
					<div variant="h2" className={classes.bodyLabel}>
						<MdOutlineFavoriteBorder className={classes.favButton} />
					</div>
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
