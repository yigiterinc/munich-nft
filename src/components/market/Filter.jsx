import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
	filterDiv: {
		border: "1 px solid black",
		height: "100%",
	},
}));

const Filter = () => {
	const classes = useStyles();
	return <div className={classes.filterDiv}></div>;
};

export default Filter;
