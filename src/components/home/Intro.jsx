import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	box: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		width: "auto",
		height: "50vh",
		borderRadius: "10px",
		boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
	},
	text: {
		textAlign: "center",
		fontSize: "36px",
		fontWeight: "lighter",
		letterSpacing: "2px",
		lineHeight: 1.5,
		padding: 30,
	},
	buttonGroup: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"& > *": {
			margin: theme.spacing(3),
		},
	},
	button: {
		fontSize: "1.3rem",
		padding: "10px 20px",
	},
}));

export default function Intro() {
	const classes = useStyles();

	return (
		<Box className={classes.box}>
			<Typography className={classes.text}>
				“Insert brand name here” is <br /> the de-facto platform to <br />{" "}
				create your outstanding art <br /> gallery that reveals your <br />{" "}
				virtuosity
			</Typography>
			<div className={classes.buttonGroup}>
				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.button}
				>
					Explore
				</Button>
				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.button}
				>
					Create
				</Button>
			</div>
		</Box>
	);
}
