import React from "react";
import { darken, makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
const useStyles = makeStyles({
	galleryEditManagerContainer: {
		top: "4vh",
		marginTop: "-4vh",
		marginBottom: "2vh",
		height: "80px",
		width: "100%",
		borderBottom: "1px solid rgb(229, 232, 235)",
		background: "rgb(229, 232, 235)",
	},
	buttons: {
		maxWidth: "100%",
		margin: "auto",
		display: "flex",
		justifyContent: "flex-end",
	},
	buttonGroupPanel: {
		marginRight: "8vw",
	},
	cancelButton: {
		width: "92px",
		color: "#FFFFFF",
		margin: "13px 15px",
		padding: "13px 15px",
		"&:disabled": {
			opacity: "80%",
		},
		background: "#b35bff",
		"&:hover": {
			background: darken("#b35bff", 0.1),
		},
	},
	saveButton: {
		width: "100px",
		color: "#FFFFFF",
		margin: "13px 15px",
		padding: "13px 15px",
		"&:disabled": {
			opacity: "80%",
		},
		background: "#218838",
		"&:hover": {
			background: darken("#218838", 0.1),
		},
	},
});

const GalleryEditManager = (props) => {
	const classes = useStyles();

	return (
		<>
			{props.isEditMode && (
				<div className={classes.galleryEditManagerContainer}>
					<div className={classes.buttons}>
						<div className={classes.buttonGroupPanel}>
							<Button
								className={classes.cancelButton}
								size="large"
								variant="contained"
								onClick={() => props.switchEditableMode()}
							>
								CANCEL
							</Button>
							<Button
								className={classes.saveButton}
								size="large"
								variant="contained"
							>
								SAVE
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default GalleryEditManager;
