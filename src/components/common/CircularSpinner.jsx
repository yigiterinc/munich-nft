import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
	spinner: {
		position: "absolute",
		left: "50%",
		top: "50%",
	},
});

const CircularSpinner = () => {
	const classes = useStyles();

	return <CircularProgress className={classes.spinner} />;
};

export default CircularSpinner;
