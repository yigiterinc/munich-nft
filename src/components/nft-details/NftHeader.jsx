import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	headerContainer: {
		paddingTop: "0.4vw",
		display: "flex",
		alignItems: "center",
	},
	nftTitle: {
		marginRight: "auto",
		fontSize: "28px",
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
});

const NftHeader = (nftJson) => {
	const classes = useStyles();
	return (
		<div className={classes.headerContainer}>
			<Typography className={classes.nftTitle} variant="h4">
				{nftJson.name}
			</Typography>
		</div>
	);
};

export default NftHeader;
