import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useFileUpload } from "use-file-upload";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		paddingTop: "3vw",
		paddingLeft: "10vw",
		paddingRight: "10vw",
	},
	gridItem: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	navigationButton: {
		margin: theme.spacing(2),
		padding: "13px 25px",
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: "50%",
		marginTop: 20,
	},
	uploadButton: {
		marginTop: 10,
	},
	createButton: {
		marginTop: 20,
	},
	coverImageText: {
		marginBottom: "20px"
	},
	textField: {
		marginTop: 20,
		[theme.breakpoints.up("xs")]: {
			width: "70vw",
		},
		[theme.breakpoints.up("sm")]: {
			width: "60vw",
		},
		[theme.breakpoints.up("md")]: {
			width: "45vw",
		},
		[theme.breakpoints.up("lg")]: {
			width: "30vw",
		},
	},
}));

const AddGalleryMetadata = (props) => {
	const classes = useStyles();

	const defaultSrc = "./images/add-photo.png";

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
			spacing={4}
			className={classes.gridContainer}
		>
			<Grid item xs={12} className={classes.gridItem}>
				<Typography variant="h5" component="h2" className={classes.coverImageText}>
					Cover Image
				</Typography>
				{
					props.coverImage ?
						<img
							src={props.coverImage?.source || defaultSrc}
							alt="preview"
							className={classes.image}
						/>
						:
						props.fileUploader
				}
			</Grid>

			<Grid item xs={12} className={classes.gridItem}>
				<Typography variant="h5" component="h2">
					Gallery Name
				</Typography>
				<TextField
					className={classes.textField}
					variant="outlined"
					placeholder="Example: Kitty Cats"
					fullWidth
					value={props.collectionName}
					onChange={(event) => props.setCollectionName(event.target.value)}
				/>
			</Grid>
			<Grid item xs={12} className={classes.gridItem}>
				<Typography variant="h5" component="h2">
					Description
				</Typography>
				<TextField
					className={classes.textField}
					variant="outlined"
					placeholder="Description"
					fullWidth
					multiline
					rows={7}
					value={props.collectionDescription}
					onChange={(event) => props.setCollectionDescription(event.target.value)}
				/>
			</Grid>
			<Grid item xs={12} className={classes.gridItem}>
				{props.nextButton}
			</Grid>
		</Grid>
	);
};

export default AddGalleryMetadata;
