import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { countDecimals } from "../../utils/currency-utils";
import { MAX_BOUNDARY_FOR_NUMBER_OF_DECIMALS_NFT_PRICE } from "../../constants/priceFieldConstants";

const useStyles = makeStyles((theme) => ({
	priceFieldBorder: {
		marginTop: "3vw",
		borderRadius: "10px",
		border: "1px solid rgb(229, 232, 235)",
		overflow: "hidden",
	},
	priceFieldContainer: {
		padding: "20px",
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	makeOfferContainer: {
		padding: "20px",
		width: "50%",
	},
	makeOfferButton: {
		width: "100%",
	},
	pricePanel: {
		display: "flex",
		marginRight: "auto",
		height: "100%",
		alignItems: "center",
	},
	priceBox: {
		display: "flex",
		alignItems: "center",
	},
	price: {
		color: theme.palette.text.primary,
		fontSize: "30px",
		marginLeft: "0.1em",
	},
	usdPrice: {
		color: theme.palette.text.primary,
		marginLeft: "8px",
		fontSize: "18px",
	},
}));

const PriceField = (props) => {
	const classes = useStyles();

	let price = props.nftJson.price;
	if (price) {
		let decimal = countDecimals(price);
		if (decimal > MAX_BOUNDARY_FOR_NUMBER_OF_DECIMALS_NFT_PRICE) {
			price = price.toFixed(3);
		}
	}

	return (
		<div className={classes.priceFieldBorder}>
			{price !== null ? (
				<div className={classes.priceFieldContainer}>
					<div className={classes.pricePanel}>
						<div className={classes.priceBox}>
							<Typography
								className={classes.price}
							>{`${price} ETH`}</Typography>
						</div>
						<Typography className={classes.usdPrice}>
							{`(~ $${props.nftJson.priceUsd.toFixed(2)})`}
						</Typography>
					</div>
					<Button
						className={classes.buyButton}
						variant="outlined"
						color="primary"
					>
						buy now
					</Button>
				</div>
			) : (
				<div className={classes.makeOfferContainer}>
					<>
						<Button
							className={classes.makeOfferButton}
							variant="outlined"
							color="primary"
						>
							make offer
						</Button>
					</>
				</div>
			)}
		</div>
	);
};

export default PriceField;
