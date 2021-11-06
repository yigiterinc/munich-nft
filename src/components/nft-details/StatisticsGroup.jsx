import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles({
	statisticsGroupContainer: {
		marginTop: "1.25vw",
		display: "flex",
	},
	section: {
		display: "flex",
		marginRight: "1vw",
	},
	icon: {
		paddingRight: "0.5vw",
	},
});

const StatisticsGroup = () => {
	const classes = useStyles();
	let like = 1;
	let view = 1;

	return (
		<div className={classes.statisticsGroupContainer}>
			{view > 0 ? (
				<div className={classes.section}>
					<VisibilityIcon className={classes.icon} />
					<Typography>{view} views</Typography>
				</div>
			) : (
				<div />
			)}
			{like > 0 ? (
				<div className={classes.section}>
					<FavoriteBorderIcon className={classes.icon} />
					<Typography>{like} likes</Typography>
				</div>
			) : (
				<div />
			)}
		</div>
	);
};

export default StatisticsGroup;
