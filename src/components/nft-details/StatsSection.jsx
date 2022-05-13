import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	statsContainer: {
		border: "1px solid rgb(229, 232, 235)",
		borderRadius: "10px",
		flexWrap: "wrap",
		alignItems: "center",
		width: "fit-content",
		marginBottom: "40px",
		marginTop: "4vh",
		display: "flex",
	},
	statBox: {
		borderRight: "1px solid rgb(229, 232, 235)",
		display: "block",
	},
	lastBox: {
		display: "block",
	},
	statInnerBox: {
		width: "144px",
		height: "88px",
		borderRadius: "inherit",
		flexDirection: "column",
		display: "flex",
		alignItems: "center",
		fontSize: "14px",
		justifyContent: "center",
		padding: "10px 0px",
		textAlign: "center",
		color: "rgb(138, 147, 155)",
	},
	statType: {
		color: "rgb(88, 106, 109)",
		fontSize: "16px",
		fontWeight: "500",
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
	statVal: {
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
			<div className={classes.statsContainer}>
				{stats.map((stat, i, key) => {
					let statType = Object.keys(stat)[0];
					let statValue = Object.values(stat)[0];
					if (i + 1 === key.length) {
						return (
							<div className={classes.lastBox}>
								<div className={classes.statInnerBox}>
									<Typography className={classes.statVal}>
										{statType === "floor" || statType === "volume"
											? statValue.toFixed() + " ETH"
											: statValue.toFixed()}
									</Typography>
									<Typography className={classes.statType}>
										{statType}
									</Typography>
								</div>
							</div>
						);
					}
					return (
						<div className={classes.statBox}>
							<div className={classes.statInnerBox}>
								<Typography className={classes.statVal}>
									{statType === "floor" || statType === "volume"
										? statValue.toFixed() + " ETH"
										: statValue.toFixed()}
								</Typography>
								<Typography className={classes.statType}>{statType}</Typography>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default StatsSection;
