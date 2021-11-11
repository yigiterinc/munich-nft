import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Icon } from "@iconify/react";

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

const PriceField = () => {
	const classes = useStyles();
	let dummyPrice = 1000;
	let usdPrice = dummyPrice * 4800;
	return (
		<>
			{dummyPrice ? (
				<div className={classes.priceFieldBorder}>
					<div className={classes.priceFieldContainer}>
						<div className={classes.pricePanel}>
							<div className={classes.priceBox}>
								<Icon icon="mdi:ethereum" width="36" height="36" />
								<Typography className={classes.price}>{dummyPrice}</Typography>
							</div>
							<Typography className={classes.usdPrice}>
								{"($" + usdPrice + ")"}
							</Typography>
						</div>
						<div className={classes.buttonPanel}>
							<Button
								className={classes.buyButton}
								variant="outlined"
								color="primary"
							>
								buy now
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div />
			)}
		</>
	);
};

export default PriceField;
