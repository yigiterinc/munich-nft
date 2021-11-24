import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	filters: {
		display: "flex",
		alignItems: "center",
		height: "auto",
		"& > *": {
			margin: theme.spacing(1),
			height: theme.spacing(6),
		},
	},
}));

export default function ContainedButtons() {
	const classes = useStyles();

	return (
		<div className={classes.filters}>
			<Button variant="outlined" size="large">
				Price
			</Button>
			<Button variant="outlined" size="large">
				Chain
			</Button>
			<Button variant="outlined" size="large">
				Status
			</Button>
		</div>
	);
}
