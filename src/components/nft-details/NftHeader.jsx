import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	nftTitle: {
		marginRight: "auto",
		fontSize: "26px",
		fontWeight: "700",
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
		color: theme.palette.text.primary,
	},
}));

const NftHeader = (props) => {
	const classes = useStyles();
	return (
		<Typography className={classes.nftTitle} variant="h4">
			{props.nftJson.name}
		</Typography>
	);
};

export default NftHeader;
