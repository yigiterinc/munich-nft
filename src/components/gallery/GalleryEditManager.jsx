import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
	galleryEditManagerContainer: {
		margin: "auto",
		paddişng: "0px 20px",
	},
	buttonGroupPanel: {
		display: "block",
	},
});

const GalleryEditManager = (isEditMode) => {
	const classes = useStyles();

	return (
		<>
			{isEditMode && (
				<div className={classes.galleryEditManagerContainer}>
					<div className={classes.buttonGroupPanel}>
						<Button variant="contained" color="primary">
							Preview
						</Button>
						<Button variant="contained" color="primary">
							Cancel
						</Button>
						<Button variant="contained" color="primary">
							Save
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default GalleryEditManager;
