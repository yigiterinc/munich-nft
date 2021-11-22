import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
	filterDiv: {
		border: "1 px solid black",
	},
	spinner: {},
}));

const MarketItem = () => {
	const classes = useStyles();
	return <Box className={classes.filterDiv}></Box>;
};

export default MarketItem;
