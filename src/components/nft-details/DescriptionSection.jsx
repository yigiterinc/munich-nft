import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	descriptionTabContainer: {
		marginTop: "0.75vw",
		color: theme.palette.text.primary,
	},
}));

const DescriptionSection = (nftJson) => {
	const classes = useStyles();
	return (
		<div className={classes.descriptionTabContainer}>
			<Typography component="span" className={classes.descriptionText}>
				{nftJson.description || "No description"}
			</Typography>
		</div>
	);
};

export default DescriptionSection;
