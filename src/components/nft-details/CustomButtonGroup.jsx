import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import RefreshIcon from "@material-ui/icons/Refresh";
import ShareIcon from "@material-ui/icons/Share";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	btnGroupContainer: {
		display: "flex",
		flexDirection: "column",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

const CustomButtonGroup = () => {
	const classes = useStyles();
	return (
		<div className={classes.btnGroupContainer}>
			<ButtonGroup color="transparent">
				<Button size="small" className={classes.button}>
					<RefreshIcon onClick={() => {}} />
				</Button>
				<Button size="small" className={classes.button}>
					<ShareIcon onClick={() => {}} />
				</Button>
				<Button size="small" className={classes.button}>
					<ReportProblemIcon onClick={() => {}} />
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default CustomButtonGroup;
