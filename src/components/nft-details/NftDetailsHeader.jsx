import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CustomButtonGroup from "./CustomButtonGroup";

const useStyles = makeStyles({
	headerContainer: {
		display: "flex",
		alignItems: "center",
	},
	nftTitle: {
		marginRight: "auto",
		overflow: "hidden",
	},
});

const NftDetailsHeader = (nftJson) => {
	const classes = useStyles();
	return (
		<div className={classes.headerContainer}>
			<Typography className={classes.nftTitle} variant="h4">
				{nftJson.name}
			</Typography>
			<CustomButtonGroup />
		</div>
	);
};

export default NftDetailsHeader;
