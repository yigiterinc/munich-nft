import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	instructionContainer: {
		height: "auto",
		minHeight: "30vh",
		width: "30vw",
		boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 5px 5px",
		borderRadius: "10px",
		padding: "20px 10px",
		marginRight: "2vw",
	},
	icon: {
		textAlign: "center",
		width: "100%",
		marginBottom: "10px",
		marginTop: "10px",
	},
	label: {
		textAlign: "center",
		marginBottom: "2vh",
	},
	descriptionContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	description: {
		width: "15vw",
		fontSize: "17px",
		textAlign: "center",
	},
}));

function Instruction({ data }) {
	const { icon, label, description } = data;
	const classes = useStyles();

	return (
		<Box className={classes.instructionContainer}>
			<div className={classes.icon}>{icon}</div>
			<Typography variant="h5" className={classes.label}>
				{label}
			</Typography>
			<div className={classes.descriptionContainer}>
				<Typography variant="body1" className={classes.description}>
					{description}
				</Typography>
			</div>
		</Box>
	);
}

export default Instruction;
