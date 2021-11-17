import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	descriptionTabContainer: {
		marginTop: "0.75vw",
	},
});

const DescriptionTab = (nftJson) => {
	const classes = useStyles();
	return (
		<div className={classes.descriptionTabContainer}>
			<Typography component="span" className={classes.descriptionText}>
				{nftJson.description}
			</Typography>
		</div>
	);
};

export default DescriptionTab;
