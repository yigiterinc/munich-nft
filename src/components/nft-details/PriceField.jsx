import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Icon } from "@iconify/react";
import { countDecimals } from "../../api/currencyHelper";

const useStyles = makeStyles({
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
		fontSize: "30px",
		marginLeft: "0.1em",
	},
	usdPrice: {
		color: "gray",
		marginLeft: "8px",
		fontSize: "18px",
	},
});

const PriceField = (nftJson) => {
	const classes = useStyles();

	let price = nftJson.price;
	let decimal = countDecimals(price);
	if (decimal > 4) {
		price = price.toFixed(3);
	}
	return (
		<div className={classes.priceFieldBorder}>
			{price !== null ? (
				<div className={classes.priceFieldContainer}>
					<div className={classes.pricePanel}>
						<div className={classes.priceBox}>
							<Icon icon="mdi:ethereum" width="36" height="36" />
							<Typography className={classes.price}>{price}</Typography>
						</div>
						<Typography className={classes.usdPrice}>
							{`(~ $${nftJson.priceUsd.toFixed(2)})`}
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
