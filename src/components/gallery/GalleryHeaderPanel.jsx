import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
	galleryHeaderpanel: {
		marginLeft: "20px",
		"& .MuiTypography-root": {
			marginBottom: "2vh",
			marginTop: "2vh",
		},
		"& .MuiLink-root": {
			marginBottom: "2vh",
			marginTop: "2vh",
		},
	},
});

const GalleryHeaderPanel = (galleryJson) => {
	const classes = useStyles();
	const path = `/profile/${galleryJson.userId}`;

	const redirectToProfilePage = () => {
		window.location.href = path;
	};

	return (
		<div className={classes.galleryHeaderpanel}>
			<Typography className={classes.title} variant="h4">
				{galleryJson.name}
			</Typography>
			<Link
				onClick={redirectToProfilePage}
				className={classes.creator}
				variant="h5"
			>
				{galleryJson.creator}
			</Link>
			<Typography className={classes.description} variant="h5">
				{galleryJson.description}
			</Typography>
		</div>
	);
};

export default GalleryHeaderPanel;
