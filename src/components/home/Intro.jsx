import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		width: "30vw",
		height: "50vh",
	},
	text: {
		lineHeight: 1.5,
		letterSpacing: 1,
		border: "solid transparent",
		borderRadius: 10,
		backgroundImage:
			"linear-gradient(white, white), linear-gradient(90deg, rgba(93,78,156,1) 0%, rgba(184,202,250,1) 100%)",
		backgroundOrigin: "border-box",
		backgroundClip: "padding-box, border-box",
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
}));

export default function Intro() {
	const classes = useStyles();

	return (
		<Paper className={classes.paper}>
			<Typography variant="h4" className={classes.text}>
				“Insert brand name here” is <br /> the de-facto platform to <br />{" "}
				create your outstanding art <br /> gallery that reveals your <br />{" "}
				virtuosity
			</Typography>
			<div className={classes.buttonGroup}>
				<Button variant="contained" color="primary" size="large">
					Explore
				</Button>
				<Button variant="contained" color="primary" size="large">
					Create
				</Button>
			</div>
		</Paper>
	);
}
