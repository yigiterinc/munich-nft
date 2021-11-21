import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	collectionHeaderContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	banner: {
		height: "40vh",
		width: "80vw",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundImage: `url(images/banner.jpg)`,
	},
	image: {
		objectFit: "cover",
		marginTop: "2vh",
		borderRadius: "50%",
		height: theme.spacing(12),
		width: theme.spacing(12),
	},
	name: {
		marginTop: theme.spacing(1),
		fontWeight: "lighter",
	},
	description: {
		marginTop: theme.spacing(1),
		width: "30vw",
		fontWeight: "lighter",
		textAlign: "center",
	},
}));

const CollectionHeader = () => {
	const classes = useStyles();

	return (
		<div className={classes.collectionHeaderContainer}>
			<Paper className={classes.banner}>
				<img src="images/cat.jpg" alt="preview" className={classes.image} />
			</Paper>
			<Typography className={classes.name} variant="h5" component="h2">
				Collection Name
			</Typography>
			<Typography className={classes.name} variant="h6" component="h2">
				Collection Creator
			</Typography>
			<Typography
				className={classes.description}
				variant="body1"
				component="h2"
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat.
			</Typography>
		</div>
	);
};

export default CollectionHeader;
