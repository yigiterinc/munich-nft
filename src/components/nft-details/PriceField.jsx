import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { countDecimals } from "../../utils/currency-utils";
import { MAX_BOUNDARY_FOR_NUMBER_OF_DECIMALS_NFT_PRICE } from "../../constants/priceFieldConstants";

const useStyles = makeStyles((theme) => ({
	priceFieldContainer: {
		marginTop: "2.5vh",
		borderRadius: "10px",
		border: `1px solid ${theme.palette.text.primary}`,
		overflow: "hidden",
		padding: "16px",
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	makeOfferButton: {
		marginTop: "5vh",
		height: 50,
		width: "40%",
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
		fontSize: "16px",
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
		<div>
			{price ? (
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
					<Button variant="outlined" color="primary">
						buy now
					</Button>
				</div>
			) : (
				<Button
					className={classes.makeOfferButton}
					variant="outlined"
					color="primary"
				>
					make offer
				</Button>
			)}
		</div>
	);
};

export default PriceField;
