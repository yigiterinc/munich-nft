import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	properties: {
		border: "2px solid rgb(225, 225, 225)",
		borderRadius: "10px",
		marginBottom: "40px",
		marginTop: "4vh",
		display: "flex",
		width: "100%",
		boxSizing: "border-box",
	},
	propertyBox: {
		borderBottom: "2px solid rgb(225, 225, 225)",
		borderRight: "2px solid rgb(225, 225, 225)",
		overflow: "hidden",
		textAlign: "center",
		width: "100%",
		alignItems: "center",
	},
	propertyInnerBox: {
		borderRadius: "16px",
		width: "100%",
		border: 0,
	},
	propertyType: {
		color: "rgb(88, 106, 109)",
		fontSize: "16px",
		fontWeight: "500",
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
	propertyValue: {
		color: "rgb(53, 56, 64)",
		fontSize: "14.5px",
		fontWeight: "500",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
});

const StatsSection = (nftJson) => {
	const classes = useStyles();

	return <>{renderStats(classes, nftJson.stats)}</>;
};

export const renderStats = (classes, stats) => {
	return (
		<>
			<Grid xs={1} />
			<Grid
				container
				justifyContent="flex-start"
				className={classes.properties}
				xs={12}
			>
				{stats.map((stat, key) => {
					let statType = Object.keys(stat)[0];
					let statValue = Object.values(stat)[0];
					return (
						<Grid item xs={3} key={key} className={classes.propertyBox}>
							<div className={classes.propertyInnerBox}>
								<Typography className={classes.propertyType}>
									{statNameHelper(statType)}
								</Typography>
								<Typography className={classes.propertyValue}>
									{statValueHelper(statType, statValue)}
								</Typography>
							</div>
						</Grid>
					);
				})}
			</Grid>
			<Grid xs={1} />
		</>
	);
};

export const statNameHelper = (str) => {
	return str.replace(/_+/g, " ");
};

export const statValueHelper = (type, val) => {
	if (type.includes("Volume")) {
		val = (val / 1000).toFixed(2) + "K";
	} else if (type === "Average_Sales_Price") val = val.toFixed() + " ETH";
	return val;
};

export default StatsSection;
