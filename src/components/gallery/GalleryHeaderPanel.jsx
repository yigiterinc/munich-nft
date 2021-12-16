import React from "react";
import { makeStyles, darken } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	title: {
		marginBottom: "2vh",
	},
	creator: {
		textDecoration: "none",
		border: "solid 8px #e5e5ea",
		borderRadius: 10,
		background: "#e5e5ea",
		cursor: "pointer",
		"&:hover": {
			color: "#65657d",
			background: darken("#e5e5ea", 0.05),
			border: `solid 8px ${darken("#e5e5ea", 0.05)}`,
		},
		"&:visited": {
			color: "#65657d",
		},
		"&:active": {
			color: "#65657d",
		},
	},
	description: {
		marginTop: "2vh",
	},
});

const GalleryHeaderPanel = (galleryJson) => {
	const classes = useStyles();

	return (
		<div className={classes.galleryHeaderpanel}>
			<Typography className={classes.title} variant="h4">
				{galleryJson.name}
			</Typography>
			<Typography
				to={`/profile/${galleryJson?.userId}`}
				component={Link}
				className={classes.creator}
				variant="h5"
			>
				{galleryJson.creator}
			</Typography>
			<Typography className={classes.description} variant="h5">
				{galleryJson.description}
			</Typography>
		</div>
	);
};

export default GalleryHeaderPanel;
