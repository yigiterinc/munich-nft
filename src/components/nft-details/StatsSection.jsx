import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
	properties: {
		paddingTop: "4vh",
		paddingBottom: "4vh",
	},
	propertyBox: {
		border: "rgb(255, 255, 255)",
		boxShadow: "rgb(0 0 0 / 4%) 0px 2px 20px",
		overflow: "hidden",
		padding: "8px",
		textAlign: "center",
	},
	propertyType: {
		color: "rgb(88, 106, 109)",
		fontSize: "13px",
		fontWeight: "500",
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
	propertyValue: {
		color: "rgb(53, 56, 64)",
		fontSize: "14px",
		fontWeight: "500",
		lineHeight: "26px",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		textTransform: "capitalize",
	},
	propertyRarity: {
		color: "rgb(112, 122, 131)",
		fontSize: "14px",
		lineHeight: "16px",
		minHeight: "16px",
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
				spacing={2}
				justifyContent="flex-start"
				className={classes.properties}
				xs={10}
			>
				{stats.map((stat, key) => {
					let statType = Object.keys(stat)[0];
					return (
						<Grid item xs={3} key={key}>
							<div className={classes.propertyBox}>
								<Typography className={classes.propertyType}>
									{statNameHelper(statType).toLowerCase()}
								</Typography>
								<Typography className={classes.propertyValue}>
									{Object.values(stat)[0]}
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

export default StatsSection;
